import { Module } from '@nestjs/common';
import { ClientsService } from './services/clients.service';
import { ClientsController } from './controllers/clients.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientRepository } from './repositories/clients.repository';
import { OperatorValidationService } from './services/operator-validation.service';
import { EmailValidationService } from './services/email-validation.service';
import { MulterModule } from '@nestjs/platform-express';
import { OperatorsRepository } from 'src/operators/repositories/operators.repository';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [ClientsController],
  providers: [
    ClientsService,
    ClientRepository,
    OperatorsRepository,
    OperatorValidationService,
    EmailValidationService,
  ],
})
export class ClientsModule {}
