import { Module } from '@nestjs/common';
import { ElectionController } from './election.controller';
import { ElectionService } from './election.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Election, ElectionSchema } from './election.model';
import { APP_FILTER } from '@nestjs/core';
import { GrpcServerExceptionFilter } from 'nestjs-grpc-exceptions';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/election-service'),
    MongooseModule.forFeature([
      { name: Election.name, schema: ElectionSchema },
    ]),
  ],
  controllers: [ElectionController],
  providers: [
    ElectionService,
    {
      provide: APP_FILTER,
      useClass: GrpcServerExceptionFilter,
    },
  ],
})
export class ElectionModule {}
