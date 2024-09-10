import { Test, TestingModule } from '@nestjs/testing';
import { OperatorsService } from './operators.service';
import { OperatorsRepository } from '../repositories/operators.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('OperatorsService', () => {
  let service: OperatorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [OperatorsService, OperatorsRepository],
    }).compile();

    service = module.get<OperatorsService>(OperatorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
