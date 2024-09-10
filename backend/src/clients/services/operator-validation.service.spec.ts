import { Test, TestingModule } from '@nestjs/testing';
import { OperatorValidationService } from './operator-validation.service';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('OperatorValidationService', () => {
  let service: OperatorValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [OperatorValidationService],
    }).compile();

    service = module.get<OperatorValidationService>(OperatorValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
