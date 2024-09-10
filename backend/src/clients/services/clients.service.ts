import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ClientRepository } from '../repositories/clients.repository';
import { OperatorValidationService } from './operator-validation.service';
import { EmailValidationService } from './email-validation.service';
import * as csvParser from 'csv-parser';
import * as fastCsv from 'fast-csv';
import * as fs from 'fs';

@Injectable()
export class ClientsService {
  constructor(
    private readonly repository: ClientRepository,
    private readonly operatorValidationService: OperatorValidationService,
    private emailValidationService: EmailValidationService,
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      await this.operatorValidationService.validateOperatorExists(
        createClientDto.operatorId,
      );

      await this.emailValidationService.ensureEmailDoesNotExist(
        createClientDto.email,
      );

      return this.repository.create(createClientDto);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw new BadRequestException(error.message);
      }
      throw error; // Rethrow other errors
    }
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    try {
      return await this.repository.findOne(id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException(`Nenhum client com ID ${id} foi encontrado`);
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    try {
      const currentClient = await this.repository.findOne(id);

      if (updateClientDto.operatorId)
        await this.operatorValidationService.validateOperatorExists(
          updateClientDto.operatorId,
        );
      if (
        updateClientDto.email &&
        updateClientDto.email !== currentClient.email
      )
        await this.emailValidationService.ensureEmailDoesNotExist(
          updateClientDto.email,
        );

      return this.repository.update(id, updateClientDto);
    } catch (error) {
      // Prisma error code for record not found
      if (error.code === 'P2025')
        throw new NotFoundException(
          `Nenhum cliente com ID ${id} foi encontrado`,
        );

      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw new BadRequestException(error.message);
      }

      throw error; // Re-throw if it's a different error
    }
  }

  remove(id: number) {
    try {
      return this.repository.remove(id);
    } catch (error) {
      // Prisma error code for record not found
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Nenhum cliente com ID ${id} foi encontrado`,
        );
      }
      throw error; // Re-throw if it's a different error
    }
  }

  async import(file: Express.Multer.File): Promise<void> {
    if (!file)
      throw new HttpException(
        'Nenhum arquivo foi enviado',
        HttpStatus.BAD_REQUEST,
      );

    const clients = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(file.path)
        .pipe(csvParser(['name', 'birth_date', 'value', 'email']))
        .on('data', (row) => {
          clients.push(row);
        })
        .on('end', async () => {
          try {
            clients.shift();
            for (const client of clients) {
              await this.repository.create({
                name: client.name.trim(),
                birth_date: client.birth_date.trim(),
                value: Math.round(parseFloat(client.value.trim()) * 100),
                email: client.email.trim(),
                operatorId: null,
              });
            }
            resolve();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            reject(new BadRequestException('Erro ao importar Clientes'));
          }
        })
        .on('error', () => {
          reject(new BadRequestException('Erro ao processar o arquivo CSV'));
        });
    });
  }

  async export(res): Promise<void> {
    try {
      const clients = await this.repository.findAll();

      const ws = fastCsv.write(clients, { headers: true });
      res.setHeader('Content-Disposition', 'attachment; filename=clients.csv');
      res.setHeader('Content-Type', 'text/csv');
      ws.pipe(res);
    } catch (error) {
      throw error;
    }
  }
}
