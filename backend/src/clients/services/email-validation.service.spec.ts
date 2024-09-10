import { Test, TestingModule } from '@nestjs/testing';
import { EmailValidationService } from './email-validation.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientRepository } from '../repositories/clients.repository';
import { BadRequestException } from '@nestjs/common';

describe('EmailValidationService', () => {
  let service: EmailValidationService;
  let repository: ClientRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        EmailValidationService,
        {
          provide: ClientRepository,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmailValidationService>(EmailValidationService);
    repository = module.get<ClientRepository>(ClientRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('ensureEmailDoesNotExist', () => {
    it('should not throw an exception if email does not exist', async () => {
      // Arrange
      const email = 'new@example.com';
      (repository.findByEmail as jest.Mock).mockResolvedValue(null);

      // Act & Assert
      await expect(
        service.ensureEmailDoesNotExist(email),
      ).resolves.not.toThrow();
    });

    it('should throw BadRequestException if email already exists', async () => {
      // Arrange
      const email = 'existing@example.com';
      (repository.findByEmail as jest.Mock).mockResolvedValue({ email });

      // Act & Assert
      await expect(service.ensureEmailDoesNotExist(email)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
