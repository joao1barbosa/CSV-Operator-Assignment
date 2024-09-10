import { Test, TestingModule } from '@nestjs/testing';
import { OperatorValidationService } from './operator-validation.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OperatorsRepository } from 'src/operators/repositories/operators.repository';
import { NotFoundException } from '@nestjs/common';

describe('OperatorValidationService', () => {
  let service: OperatorValidationService;
  let repository: OperatorsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        OperatorValidationService,
        {
          provide: OperatorsRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OperatorValidationService>(OperatorValidationService);
    repository = module.get<OperatorsRepository>(OperatorsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateOperatorExists', () => {
    it('should not throw an exception if operator exists', async () => {
      // Arrange
      const operatorId = 1;
      (repository.findOne as jest.Mock).mockResolvedValue({ id: operatorId });

      // Act & Assert
      await expect(
        service.validateOperatorExists(operatorId),
      ).resolves.not.toThrow();
    });

    it('should throw NotFoundException if operator does not exist', async () => {
      // Arrange
      const operatorId = 1;
      (repository.findOne as jest.Mock).mockRejectedValue(
        new Error('Not Found'),
      );

      // Act & Assert
      await expect(service.validateOperatorExists(operatorId)).rejects.toThrow(
        new NotFoundException(`O operador com ID ${operatorId} não existe.`),
      );
    });
  });
});
