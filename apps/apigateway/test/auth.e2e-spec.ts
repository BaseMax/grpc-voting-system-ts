import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { RegisterDto } from '../src/auth/dto';
import { faker } from '@faker-js/faker';

describe('Auth Module API (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/auth/register (POST)', () => {
    it('should successfully register', async () => {
      const registerDto: RegisterDto = {
        username: faker.person.fullName(),
        password: faker.internet.password(),
      };

      const data = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(201);

      expect(data.body.token).toBeTruthy();
      expect(typeof data.body.token).toBe('string');
    });

    it('should throw error "username is already exist"', async () => {
      const registerDto: RegisterDto = {
        username: faker.person.fullName(),
        password: faker.internet.password(),
      };

      await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(201);

      const data = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(409);

      expect(data.body.token).toBeFalsy();
      expect(data.body.error).toBe('CONFLICT');
      expect(data.body.message).toBe('user with this username exists');
    });
  });

  describe('LOGIN /auth/login (POST)', () => {
    it('should throw error invalid credntials(no username)', async () => {
      const registerDto: RegisterDto = {
        username: faker.person.fullName(),
        password: faker.internet.password(),
      };

      await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(201);

      const data = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ ...registerDto, username: 'NO_EXIST' })
        .expect(401);

      expect(data.body.token).toBeFalsy();
      expect(data.body).toEqual({
        message: 'wrong credentials',
        statusCode: 401,
        error: 'UNAUTHORIZED',
      });
    });

    it('should throw error invalid credntials(wrong password)', async () => {
      const registerDto: RegisterDto = {
        username: faker.person.fullName(),
        password: faker.internet.password(),
      };

      await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(201);

      const data = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ ...registerDto, password: 'NO_EXIST' })
        .expect(401);

      expect(data.body.token).toBeFalsy();
      expect(data.body).toEqual({
        message: 'wrong credentials',
        statusCode: 401,
        error: 'UNAUTHORIZED',
      });
    });
  });
});
