import { Module, ValidationPipe } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientRepository } from './clients.repository';
import { OperatorExistsValidator } from './validators/operator-exists.validator';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [PrismaModule],
  controllers: [ClientsController],
  providers: [
    ClientsService,
    ClientRepository,
    OperatorExistsValidator,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class ClientsModule {}
