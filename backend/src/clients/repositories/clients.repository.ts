import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { clientSelect } from 'src/common/selects/client-select';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';

@Injectable()
export class ClientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateClientDto) {
    return await this.prisma.client.create({
      data,
      select: clientSelect,
    });
  }

  async findAll() {
    return await this.prisma.client.findMany({
      select: clientSelect,
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.client.findUnique({
      where: { email },
    });
  }

  async findOne(id: number) {
    return await this.prisma.client.findUniqueOrThrow({
      where: { id },
      select: clientSelect,
    });
  }

  async update(id: number, data: UpdateClientDto) {
    return await this.prisma.client.update({
      where: { id },
      data,
      select: clientSelect,
    });
  }

  async remove(id: number) {
    return await this.prisma.client.delete({
      where: { id },
      select: clientSelect,
    });
  }
}
