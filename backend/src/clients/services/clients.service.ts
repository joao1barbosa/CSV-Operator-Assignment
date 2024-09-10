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
import { OperatorsRepository } from 'src/operators/repositories/operators.repository';
import { OperatorValidationService } from '../../operators/services/operator-validation.service';
import { EmailValidationService } from './email-validation.service';
import * as csvParser from 'csv-parser';
import * as fastCsv from 'fast-csv';
import * as fs from 'fs';
import { ClientDto } from 'src/types/client.types';

@Injectable()
export class ClientsService {
  constructor(
    private readonly repository: ClientRepository,
    private readonly operatorRepository: OperatorsRepository,
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

  async findAll() {
    return await this.repository.findAll();
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

  async remove(id: number) {
    try {
      return await this.repository.remove(id);
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

    const clients = await this.parseCSV(file.path);
    const operators = await this.operatorRepository.findIds();

    if (!operators.length)
      throw new NotFoundException(
        'Nenhum operador encontrado para distribuir clientes.',
      );

    return await this.distribute(clients, operators);
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

  private async parseCSV(filePath: string): Promise<ClientDto[]> {
    return new Promise((resolve, reject) => {
      const clients = [];
      fs.createReadStream(filePath)
        .pipe(csvParser(['name', 'birth_date', 'value', 'email']))
        .on('data', (row) => clients.push(row))
        .on('end', () => resolve(clients.slice(1)))
        .on('error', () => {
          reject(new BadRequestException('Erro ao processar o arquivo CSV'));
        });
    });
  }

  private async distribute(
    clients: ClientDto[],
    operators: { id: number }[],
  ): Promise<void> {
    try {
      for (let i = 0; i < clients.length; i++) {
        const client = clients[i];
        const operator = operators[i % operators.length];
        await this.create({
          name: client.name.trim(),
          birth_date: client.birth_date.trim(),
          value: Math.round(parseFloat(client.value.trim()) * 100),
          email: client.email.trim(),
          operatorId: operator.id,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw error;
    }
  }

  async redistribute() {
    const clients = await this.findAll();
    const operators = await this.operatorRepository.findIds();

    if (!operators.length)
      throw new NotFoundException(
        'Nenhum operador encontrado para distribuir clientes.',
      );

    let operatorIndex = 0;
    for (const client of clients) {
      await this.update(client.id, { operatorId: operators[operatorIndex].id });

      operatorIndex++;
      if (operators[operatorIndex] === undefined) {
        operatorIndex = 0;
      }
    }
  }
}
