import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientRepository } from '../repositories/clients.repository';
import { EmailValidationService } from './email-validation.service';
import { OperatorValidationService } from './operator-validation.service';
import { OperatorsRepository } from 'src/operators/repositories/operators.repository';

describe('ClientsService', () => {
  let service: ClientsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        ClientsService,
        ClientRepository,
        OperatorValidationService,
        EmailValidationService,
        OperatorsRepository,
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
