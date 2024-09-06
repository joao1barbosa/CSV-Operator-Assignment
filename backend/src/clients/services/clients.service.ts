import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ClientRepository } from '../repositories/clients.repository';
import { OperatorValidationService } from './operator-validation.service';
import { EmailValidationService } from './email-validation.service';

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

  findOne(id: number) {
    try {
      return this.repository.findOne(id);
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
}
