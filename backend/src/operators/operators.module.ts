import { Module } from '@nestjs/common';
import { OperatorsService } from './services/operators.service';
import { OperatorsController } from './controllers/operators.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { OperatorsRepository } from './repositories/operators.repository';

@Module({
  imports: [PrismaModule],
  controllers: [OperatorsController],
  providers: [OperatorsService, OperatorsRepository],
})
export class OperatorsModule {}
