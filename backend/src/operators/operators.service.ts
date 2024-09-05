import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { OperatorsRepository } from './operators.repository';

@Injectable()
export class OperatorsService {
  constructor(private readonly repository: OperatorsRepository) {}

  async create(createOperatorDto: CreateOperatorDto) {
    return this.repository.create(createOperatorDto);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    try {
      return await this.repository.findOne(id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException(
        `Nenhum operador com ID ${id} foi encontrado`,
      );
    }
  }

  async update(id: number, updateOperatorDto: UpdateOperatorDto) {
    try {
      return await this.repository.update(id, updateOperatorDto);
    } catch (error) {
      // Prisma error code for record not found
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Nenhum operador com ID ${id} foi encontrado`,
        );
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
          `Nenhum operador com ID ${id} foi encontrado`,
        );
      }
      throw error; // Re-throw if it's a different error
    }
  }
}
