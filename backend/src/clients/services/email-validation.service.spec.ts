import { Test, TestingModule } from '@nestjs/testing';
import { EmailValidationService } from './email-validation.service';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('EmailValidationService', () => {
  let service: EmailValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [EmailValidationService],
    }).compile();

    service = module.get<EmailValidationService>(EmailValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
