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
    return request(app.getHttpServer()).get('/api/v1/clients').expect(200);
  });

  it('/clients (POST)', () => {
    const createClientDto = {
      name: 'John Doe',
      birth_date: '1990-01-01',
      value: 100,
      email: 'john.doe@example.com',
      operatorId: 1,
    };
    return request(app.getHttpServer())
      .post('/api/v1/clients')
      .send(createClientDto)
      .expect(201);
  });

  it('/clients/:id (GET)', () => {
    return request(app.getHttpServer()).get('/api/v1/clients/1').expect(200);
  });

  it('/clients/:id (PATCH)', () => {
    const updateClientDto = {
      name: 'Jane Doe',
    };
    return request(app.getHttpServer())
      .patch('/api/v1/clients/1')
      .send(updateClientDto)
      .expect(200);
  });

  it('/clients/:id (DELETE)', () => {
    return request(app.getHttpServer()).delete('/api/v1/clients/1').expect(200);
  });

  it('/clients/upload (POST)', () => {
    const file = Buffer.from(
      'name,birth_date,value,email\nJohn Doe,1990-01-01,100,john.doe@example.com',
      'utf-8',
    );
    return request(app.getHttpServer())
      .post('/api/v1/clients/upload')
      .attach('file', file, 'clients.csv')
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
