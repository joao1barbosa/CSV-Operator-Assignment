import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmailValidationService {
  constructor(private prisma: PrismaService) {}

  async ensureEmailDoesNotExist(email: string): Promise<void> {
    const emailExist = await this.prisma.client.findUnique({
      where: { email },
    });
    if (!!emailExist) {
      throw new BadRequestException(`O email já está em uso.`);
    }
  }
}
