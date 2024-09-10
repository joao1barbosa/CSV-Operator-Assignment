import { Test, TestingModule } from '@nestjs/testing';
import { OperatorsController } from './operators.controller';
import { OperatorsService } from '../services/operators.service';
import { OperatorsRepository } from '../repositories/operators.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('OperatorsController', () => {
  let controller: OperatorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [OperatorsController],
      providers: [OperatorsService, OperatorsRepository],
    }).compile();

    controller = module.get<OperatorsController>(OperatorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
