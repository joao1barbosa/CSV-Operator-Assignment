import { Test, TestingModule } from '@nestjs/testing';
import { OperatorValidationService } from './operator-validation.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OperatorsRepository } from 'src/operators/repositories/operators.repository';

describe('OperatorValidationService', () => {
  let service: OperatorValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [OperatorValidationService, OperatorsRepository],
    }).compile();

    service = module.get<OperatorValidationService>(OperatorValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
