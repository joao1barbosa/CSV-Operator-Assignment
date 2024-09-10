import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from '../services/clients.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientRepository } from '../repositories/clients.repository';
import { OperatorsRepository } from 'src/operators/repositories/operators.repository';
import { EmailValidationService } from '../services/email-validation.service';
import { OperatorValidationService } from '../../operators/services/operator-validation.service';

describe('ClientsController', () => {
  let controller: ClientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [ClientsController],
      providers: [
        ClientsService,
        ClientRepository,
        OperatorsRepository,
        OperatorValidationService,
        EmailValidationService,
      ],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
