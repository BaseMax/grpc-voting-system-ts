import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { RegisterDto } from '../src/auth/dto';
import { faker } from '@faker-js/faker';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { User, UserSchema } from 'apps/auth/src/user.model';
import { Model } from 'mongoose';
import { Role } from '@app/common';
import { CreateCandidateDto } from '../src/candidate/dto';

describe('CandidateController (e2e)', () => {
  let app: INestApplication;
  let userModel: Model<User>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forRoot('mongodb://localhost:27017/auth-service'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    userModel = moduleFixture.get<Model<User>>(getModelToken(User.name));
    await app.init();
  });

  describe('Create Candidate /candidate (POST)', () => {
    it('should create candidate successfully', async () => {
      const registerDto: RegisterDto = {
        username: faker.person.fullName(),
        password: faker.internet.password(),
      };

      const regData = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto);

      await userModel.updateOne(
        { username: registerDto.username },
        { role: Role.ADMIN },
      );

      const createCandidateDto: CreateCandidateDto = {
        name: faker.person.fullName(),
        age: Math.floor(Math.random() * 40),
      };
      const data = await request(app.getHttpServer())
        .post('/candidate')
        .set('Authorization', `Bearer ${regData.body.token}`)
        .send(createCandidateDto)
        .expect(201);

      expect(data.body).toEqual({
        candidate: {
          id: expect.any(String),
          name: createCandidateDto.name,
          age: createCandidateDto.age,
        },
      });
    });
    it('should throw not able to add candidate (only admin)', async () => {
      const registerDto: RegisterDto = {
        username: faker.person.fullName(),
        password: faker.internet.password(),
      };

      const regData = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto);

      const createCandidateDto: CreateCandidateDto = {
        name: faker.person.fullName(),
        age: Math.floor(Math.random() * 40),
      };

      const data = await request(app.getHttpServer())
        .post('/candidate')
        .set('Authorization', `Bearer ${regData.body.token}`)
        .send(createCandidateDto)
        .expect(403);

      expect(data.body).toEqual({
        error: 'Forbidden',
        message: 'Forbidden resource',
        statusCode: 403,
      });
    });
  });

  it('should throw not able to add candidate (only login)', async () => {
    const createCandidateDto: CreateCandidateDto = {
      name: faker.person.fullName(),
      age: Math.floor(Math.random() * 40),
    };

    const data = await request(app.getHttpServer())
      .post('/candidate')
      .send(createCandidateDto)
      .expect(401);

    expect(data.body).toEqual({
      message: 'invalid token',
      error: 'Unauthorized',
      statusCode: 401,
    });
  });

  it('should throw not able to add candidate (candidate already exist)', async () => {
    const registerDto: RegisterDto = {
      username: faker.person.fullName(),
      password: faker.internet.password(),
    };

    const regData = await request(app.getHttpServer())
      .post('/auth/register')
      .send(registerDto);

    await userModel.updateOne(
      { username: registerDto.username },
      { role: Role.ADMIN },
    );

    const createCandidateDto: CreateCandidateDto = {
      name: faker.person.fullName(),
      age: Math.floor(Math.random() * 40),
    };
    await request(app.getHttpServer())
      .post('/candidate')
      .set('Authorization', `Bearer ${regData.body.token}`)
      .send(createCandidateDto)
      .expect(201);
    const data = await request(app.getHttpServer())
      .post('/candidate')
      .set('Authorization', `Bearer ${regData.body.token}`)
      .send(createCandidateDto)
      .expect(409);

    expect(data.body).toEqual({
      message: 'a candidate already exists with this name',
      statusCode: 409,
      error: 'CONFLICT',
    });
  });

  describe('findOne candidate /candidate/:ID', async () => {
    it('should findOne successfully', async () => {
      const registerDto: RegisterDto = {
        username: faker.person.fullName(),
        password: faker.internet.password(),
      };

      const regData = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto);

      await userModel.updateOne(
        { username: registerDto.username },
        { role: Role.ADMIN },
      );

      const createCandidateDto: CreateCandidateDto = {
        name: faker.person.fullName(),
        age: Math.floor(Math.random() * 40),
      };
      const candidate = await request(app.getHttpServer())
        .post('/candidate')
        .set('Authorization', `Bearer ${regData.body.token}`)
        .send(createCandidateDto)
        .expect(201);

      const data = await request(app.getHttpServer())
        .get(`/candidate/${candidate.body.candidate.id}`)
        .set('Authorization', `Bearer ${regData.body.token}`)
        .send(createCandidateDto)
        .expect(200);

      expect(data.body).toEqual({
        candidate: {
          id: expect.any(String),
          ...createCandidateDto,
        },
      });
    });

    it('should get 404(not found)', async () => {
      const registerDto: RegisterDto = {
        username: faker.person.fullName(),
        password: faker.internet.password(),
      };

      const regData = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto);

      await userModel.updateOne(
        { username: registerDto.username },
        { role: Role.ADMIN },
      );

      const createCandidateDto: CreateCandidateDto = {
        name: faker.person.fullName(),
        age: Math.floor(Math.random() * 40),
      };
      const data = await request(app.getHttpServer())
        .get(`/candidate/${faker.database.mongodbObjectId().toString()}`)
        .set('Authorization', `Bearer ${regData.body.token}`)
        .send(createCandidateDto)
        .expect(404);

      expect(data.body).toEqual({
        error: 'NOT_FOUND',
        statusCode: 404,
        message: 'candidate not found',
      });
    });
  });
});
