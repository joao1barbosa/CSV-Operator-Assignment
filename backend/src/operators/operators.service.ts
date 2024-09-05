import { Injectable } from '@nestjs/common';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OperatorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOperatorDto: CreateOperatorDto) {
    return await this.prisma.operator.create({
      data: createOperatorDto,
    });
  }

  async findAll() {
    return this.prisma.operator.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.operator.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateOperatorDto: UpdateOperatorDto) {
    return await this.prisma.operator.update({
      where: { id },
      data: updateOperatorDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.operator.delete({
      where: { id },
    });
  }
}
