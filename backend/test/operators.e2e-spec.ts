import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('OperatorsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/operators (GET)', () => {
    return request(app.getHttpServer()).get('/api/v1/operators').expect(200);
  });

  it('/operators (POST)', () => {
    const createOperatorDto = {
      name: 'Operator 1',
    };
    return request(app.getHttpServer())
      .post('/api/v1/operators')
      .send(createOperatorDto)
      .expect(201);
  });

  it('/operators/:id (GET)', () => {
    return request(app.getHttpServer()).get('/api/v1/operators/1').expect(200);
  });

  it('/operators/:id (PATCH)', () => {
    const updateOperatorDto = {
      name: 'Updated Operator',
    };
    return request(app.getHttpServer())
      .patch('/api/v1/operators/1')
      .send(updateOperatorDto)
      .expect(200);
  });

  it('/operators/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/api/v1/operators/1')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
