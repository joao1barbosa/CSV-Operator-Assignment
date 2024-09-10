import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  operatorSelect,
  operatorWithClientsSelect,
} from 'src/common/selects/operator-select';
import { CreateOperatorDto } from '../dto/create-operator.dto';
import { UpdateOperatorDto } from '../dto/update-operator.dto';

@Injectable()
export class OperatorsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateOperatorDto) {
    return await this.prisma.operator.create({
      data,
      select: operatorSelect,
    });
  }

  async findAll() {
    return await this.prisma.operator.findMany({
      select: operatorWithClientsSelect,
    });
  }

  async findIds() {
    return await this.prisma.operator.findMany({
      select: {
        id: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.operator.findUniqueOrThrow({
      where: { id },
      select: operatorWithClientsSelect,
    });
  }

  async update(id: number, data: UpdateOperatorDto) {
    return await this.prisma.operator.update({
      where: { id },
      data,
      select: operatorSelect,
    });
  }

  async remove(id: number) {
    return await this.prisma.operator.delete({
      where: { id },
      select: operatorSelect,
    });
  }
}
