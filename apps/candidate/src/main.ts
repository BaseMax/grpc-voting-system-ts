import { NestFactory } from '@nestjs/core';
import { CandidateModule } from './candidate.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CANDIDATE_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CandidateModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:3002',
        package: CANDIDATE_PACKAGE_NAME,
        protoPath: join(__dirname, '../candidate.proto'),
      },
    },
  );
  await app.listen();
}
bootstrap();
