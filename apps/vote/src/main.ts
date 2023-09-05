import { NestFactory } from '@nestjs/core';
import { VoteModule } from './vote.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { VOTE_PACKAGE_NAME } from '@app/common/types/proto/vote';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    VoteModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:3004',
        protoPath: join(process.cwd(), 'proto', 'vote.proto'),
        package: VOTE_PACKAGE_NAME,
      },
    },
  );

  await app.listen();
}
bootstrap();
