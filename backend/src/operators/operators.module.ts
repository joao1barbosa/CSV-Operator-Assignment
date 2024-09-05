import { Module } from '@nestjs/common';
import { OperatorsService } from './operators.service';
import { OperatorsController } from './operators.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { OperatorsRepository } from './operators.repository';

@Module({
  imports: [PrismaModule],
  controllers: [OperatorsController],
  providers: [OperatorsService, OperatorsRepository],
})
export class OperatorsModule {}
