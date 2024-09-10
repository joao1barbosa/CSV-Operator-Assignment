import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('ClientsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/clients (GET)', () => {
    return request(app.getHttpServer()).get('/clients').expect(200);
  });

  it('/clients (POST)', () => {
    const createClientDto = {
      name: 'Julio',
      birth_date: '01/01/2001',
      value: 100,
      email: 'john.doe@example.com',
      operatorId: 1,
    };
    return request(app.getHttpServer())
      .post('/clients')
      .send(createClientDto)
      .expect(201);
  });

  it('/clients/:id (GET)', () => {
    return request(app.getHttpServer()).get('/clients/1').expect(200);
  });

  it('/clients/:id (PATCH)', () => {
    const updateClientDto = {
      name: 'Julio2',
    };
    return request(app.getHttpServer())
      .patch('/clients/1')
      .send(updateClientDto)
      .expect(200);
  });

  it('/clients/:id (DELETE)', () => {
    return request(app.getHttpServer()).delete('/clients/1').expect(200);
  });

  it('/clients/upload (POST)', () => {
    const file = Buffer.from(
      'nome, nascimento, valor, email\nJohn Doe,01/01/2000,10.00,john.doe@example.com',
      'utf-8',
    );
    return request(app.getHttpServer())
      .post('/clients/upload')
      .attach('file', file, 'clients.csv')
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
