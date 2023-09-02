import { NestFactory } from '@nestjs/core';
import { ElectionModule } from './election.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ELECTION_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ElectionModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:3003',
        package: ELECTION_PACKAGE_NAME,
        protoPath: join(process.cwd(), 'proto', 'election.proto'),
      },
    },
  );
  await app.listen();
}
bootstrap();
