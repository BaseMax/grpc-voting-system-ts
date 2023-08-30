import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        url: process.env['service_url'],
        package: AUTH_PACKAGE_NAME,
        protoPath: join(__dirname, '../auth.proto'),
      },
    },
  );
  await app.listen();
}
bootstrap();
