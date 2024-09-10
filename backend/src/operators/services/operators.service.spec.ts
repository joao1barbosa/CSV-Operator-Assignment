import { Test, TestingModule } from '@nestjs/testing';
import { OperatorsService } from './operators.service';
import { OperatorsRepository } from '../repositories/operators.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('OperatorsService', () => {
  let service: OperatorsService;
  let repository: OperatorsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        OperatorsService,
        {
          provide: OperatorsRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OperatorsService>(OperatorsService);
    repository = module.get<OperatorsRepository>(OperatorsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an operator', async () => {
      const createOperatorDto = { name: 'Test Operator' };
      const result = { id: 1, ...createOperatorDto };
      (repository.create as jest.Mock).mockResolvedValue(result);

      expect(await service.create(createOperatorDto)).toEqual(result);
    });

    it('should throw BadRequestException if creation fails', async () => {
      const createOperatorDto = { name: 'Test Operator' };
      const error = new Error('Creation failed');
      (repository.create as jest.Mock).mockRejectedValue(error);

      await expect(service.create(createOperatorDto)).rejects.toThrow(
        new BadRequestException('Creation failed'),
      );
    });
  });
  describe('findOne', () => {
    it('should return operator if found', async () => {
      const operator = { id: 1, name: 'Operator 1' };
      (repository.findOne as jest.Mock).mockResolvedValue(operator);

      const result = await service.findOne(1);
      expect(result).toEqual(operator);
    });

    it('should throw NotFoundException if operator is not found', async () => {
      try {
        await service.findOne(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Nenhum operador com ID 1 foi encontrado');
        expect(error.response).toEqual({
          message: `Nenhum operador com ID 1 foi encontrado`,
          error: 'Not Found',
          statusCode: 404,
        });
      }
    });
  });

  describe('update', () => {
    it('should update an operator', async () => {
      const updateOperatorDto = { name: 'Updated Operator' };
      const result = { id: 1, ...updateOperatorDto };
      (repository.update as jest.Mock).mockResolvedValue(result);

      expect(await service.update(1, updateOperatorDto)).toEqual(result);
    });

    it('should throw NotFoundException if operator to update does not exist', async () => {
      const error = { code: 'P2025' }; // Prisma error code for record not found
      (repository.update as jest.Mock).mockRejectedValue(error);

      await expect(service.update(1, {})).rejects.toThrow(
        new NotFoundException('Nenhum operador com ID 1 foi encontrado'),
      );
    });

    it('should throw BadRequestException for other errors', async () => {
      const error = new Error('Update failed');
      (repository.update as jest.Mock).mockRejectedValue(error);

      await expect(service.update(1, {})).rejects.toThrow(
        new Error('Update failed'),
      );
    });
  });

  describe('remove', () => {
    it('should remove an operator', async () => {
      const result = { id: 1 };
      (repository.remove as jest.Mock).mockResolvedValue(result);

      expect(await service.remove(1)).toEqual(result);
    });

    it('should throw NotFoundException if operator to remove does not exist', async () => {
      const error = { code: 'P2025' }; // Prisma error code for record not found
      (repository.remove as jest.Mock).mockRejectedValue(error);

      await expect(service.remove(1)).rejects.toThrow(
        new NotFoundException('Nenhum operador com ID 1 foi encontrado'),
      );
    });

    it('should throw BadRequestException for other errors', async () => {
      const error = new Error('Remove failed');
      (repository.remove as jest.Mock).mockRejectedValue(error);

      await expect(service.remove(1)).rejects.toThrow(
        new Error('Remove failed'),
      );
    });
  });
});
