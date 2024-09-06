import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OperatorValidationService {
  constructor(private prisma: PrismaService) {}

  async validateOperatorExists(id: number): Promise<void> {
    const operator = await this.prisma.operator.findUnique({
      where: { id },
    });
    if (!operator) {
      throw new NotFoundException(`O operador com ID ${id} não existe.`);
    }
  }
}
