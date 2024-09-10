import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { ClientRepository } from '../repositories/clients.repository';
import { OperatorsRepository } from 'src/operators/repositories/operators.repository';
import { EmailValidationService } from './email-validation.service';
import { OperatorValidationService } from '../../operators/services/operator-validation.service';
import {
  BadRequestException,
  NotFoundException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Readable } from 'stream';

describe('ClientsService', () => {
  let service: ClientsService;
  let clientRepository: jest.Mocked<ClientRepository>;
  let operatorRepository: jest.Mocked<OperatorsRepository>;
  let emailValidationService: jest.Mocked<EmailValidationService>;
  let operatorValidationService: jest.Mocked<OperatorValidationService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: ClientRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: OperatorsRepository,
          useValue: {
            findIds: jest.fn(),
          },
        },
        {
          provide: EmailValidationService,
          useValue: {
            ensureEmailDoesNotExist: jest.fn(),
          },
        },
        {
          provide: OperatorValidationService,
          useValue: {
            validateOperatorExists: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    clientRepository = module.get(ClientRepository);
    operatorRepository = module.get(OperatorsRepository);
    emailValidationService = module.get(EmailValidationService);
    operatorValidationService = module.get(OperatorValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a client', async () => {
      const createClientDto = {
        name: 'Test Client',
        operatorId: 1,
        email: 'test@example.com',
        birth_date: '30/12/2001',
        value: 32452,
      };
      const result = { id: 1, ...createClientDto };
      (clientRepository.create as jest.Mock).mockResolvedValue(result);
      (
        operatorValidationService.validateOperatorExists as jest.Mock
      ).mockResolvedValue(true);
      (
        emailValidationService.ensureEmailDoesNotExist as jest.Mock
      ).mockResolvedValue(true);

      expect(await service.create(createClientDto)).toEqual(result);
    });

    it('should throw BadRequestException if operator does not exist', async () => {
      const createClientDto = {
        name: 'Test Client',
        operatorId: 1,
        email: 'test@example.com',
        birth_date: '30/12/2001',
        value: 32452,
      };
      (
        operatorValidationService.validateOperatorExists as jest.Mock
      ).mockRejectedValue(new NotFoundException());

      await expect(service.create(createClientDto)).rejects.toThrow(
        new BadRequestException('Not Found'),
      );
    });

    it('should throw BadRequestException if email already exists', async () => {
      const createClientDto = {
        name: 'Test Client',
        operatorId: 1,
        email: 'test@example.com',
        birth_date: '30/12/2001',
        value: 32452,
      };
      (
        emailValidationService.ensureEmailDoesNotExist as jest.Mock
      ).mockRejectedValue(new BadRequestException('Email already exists'));

      await expect(service.create(createClientDto)).rejects.toThrow(
        new BadRequestException('Email already exists'),
      );
    });
  });

  describe('findAll', () => {
    it('should return all clients', async () => {
      const clients = [
        { id: 1, name: 'Client 1' },
        { id: 2, name: 'Client 2' },
      ];
      (clientRepository.findAll as jest.Mock).mockResolvedValue(clients);

      expect(await service.findAll()).toEqual(clients);
    });
  });

  describe('findOne', () => {
    it('should return a client if found', async () => {
      const client = { id: 1, name: 'Client 1' };
      (clientRepository.findOne as jest.Mock).mockResolvedValue(client);

      expect(await service.findOne(1)).toEqual(client);
    });

    it('should throw NotFoundException if client does not exist', async () => {
      (clientRepository.findOne as jest.Mock).mockRejectedValue(
        new Error('Record not found'),
      );

      await expect(service.findOne(1)).rejects.toThrow(
        new NotFoundException('Nenhum client com ID 1 foi encontrado'),
      );
    });
  });

  describe('update', () => {
    it('should update a client', async () => {
      const updateClientDto = { name: 'Updated Client' };
      const result = { id: 1, ...updateClientDto };
      (clientRepository.update as jest.Mock).mockResolvedValue(result);
      (clientRepository.findOne as jest.Mock).mockResolvedValue({
        id: 1,
        email: 'old@example.com',
      });
      (
        operatorValidationService.validateOperatorExists as jest.Mock
      ).mockResolvedValue(true);
      (
        emailValidationService.ensureEmailDoesNotExist as jest.Mock
      ).mockResolvedValue(true);

      expect(await service.update(1, updateClientDto)).toEqual(result);
    });

    it('should throw NotFoundException if client does not exist', async () => {
      (clientRepository.findOne as jest.Mock).mockRejectedValue({
        code: 'P2025',
      });

      await expect(service.update(1, {})).rejects.toThrow(
        new NotFoundException('Nenhum cliente com ID 1 foi encontrado'),
      );
    });

    it('should throw BadRequestException if update fails', async () => {
      (clientRepository.update as jest.Mock).mockRejectedValue(
        new Error('Update failed'),
      );

      await expect(service.update(1, {})).rejects.toThrow(
        new Error('Update failed'),
      );
    });
  });

  describe('remove', () => {
    it('should remove a client', async () => {
      const result = { id: 1 };
      (clientRepository.remove as jest.Mock).mockResolvedValue(result);

      expect(await service.remove(1)).toEqual(result);
    });

    it('should throw NotFoundException if client does not exist', async () => {
      (clientRepository.remove as jest.Mock).mockRejectedValue({
        code: 'P2025',
      });

      await expect(service.remove(1)).rejects.toThrow(
        new NotFoundException('Nenhum cliente com ID 1 foi encontrado'),
      );
    });
  });

  describe('import', () => {
    it('should import and distribute clients', async () => {
      const tempFilePath = path.join(__dirname, 'test.csv');

      // Cria um arquivo CSV com dados de teste
      fs.writeFileSync(
        tempFilePath,
        `name,birth_date,value,email\n
        Julia,25/05/1985,042.42,cliente01@teste.com.br\n
        André,04/05/1973,153.73,cliente02@teste.com.br\n
        Beatriz,20/08/1977,282.11,cliente03@teste.com.br\n
        João,31/10/1981,967.29,cliente04@teste.com.br\n`,
      );

      // Cria um Readable stream para simular o fluxo de leitura do arquivo
      const mockReadStream = Readable.from([
        'name,birth_date,value,email\n',
        'Julia,25/05/1985,042.42,cliente01@teste.com.br\n',
        'André,04/05/1973,153.73,cliente02@teste.com.br\n',
        'Beatriz,20/08/1977,282.11,cliente03@teste.com.br\n',
        'João,31/10/1981,967.29,cliente04@teste.com.br\n',
      ]);

      jest
        .spyOn(fs, 'createReadStream')
        .mockReturnValue(mockReadStream as unknown as fs.ReadStream);

      (operatorRepository.findIds as jest.Mock).mockResolvedValue([
        { id: 1 },
        { id: 2 },
      ]);

      // Mock para o método create
      const createMock = jest.fn();
      (clientRepository.create as jest.Mock).mockImplementation(createMock);

      // Prepara o arquivo para ser passado à função import
      const file = { path: tempFilePath } as Express.Multer.File;

      await service.import(file);

      // Verifica se a função create foi chamada o número esperado de vezes
      expect(createMock).toHaveBeenCalledTimes(4);
    });
    it('should throw HttpException if no file is provided', async () => {
      await expect(service.import(null)).rejects.toThrow(
        new HttpException('Nenhum arquivo foi enviado', HttpStatus.BAD_REQUEST),
      );
    });

    it('should throw NotFoundException if no operators are found', async () => {
      const tempFilePath = path.join(__dirname, 'test.csv');

      fs.writeFileSync(
        tempFilePath,
        'name,birth_date,value,email\nJohn Doe,01/01/1990,100,john@example.com',
      );

      const file = { path: tempFilePath } as Express.Multer.File;
      (operatorRepository.findIds as jest.Mock).mockResolvedValue([]);

      await expect(service.import(file)).rejects.toThrow(
        new NotFoundException(
          'Nenhum operador encontrado para distribuir clientes.',
        ),
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
