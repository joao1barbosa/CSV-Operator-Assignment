import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientRepository } from './clients.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(
    private readonly repository: ClientRepository,
    private readonly prisma: PrismaService,
  ) {
    console.log('Prisma Service: ', this.prisma);
  }

  create(createClientDto: CreateClientDto) {
    console.log('Prisma Service: ', this.prisma);
    return this.repository.create(createClientDto);
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

  update(id: number, updateClientDto: UpdateClientDto) {
    try {
      return this.repository.update(id, updateClientDto);
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
