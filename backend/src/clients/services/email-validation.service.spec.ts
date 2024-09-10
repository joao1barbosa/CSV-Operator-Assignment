import { Test, TestingModule } from '@nestjs/testing';
import { EmailValidationService } from './email-validation.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientRepository } from '../repositories/clients.repository';

describe('EmailValidationService', () => {
  let service: EmailValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [EmailValidationService, ClientRepository],
    }).compile();

    service = module.get<EmailValidationService>(EmailValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
