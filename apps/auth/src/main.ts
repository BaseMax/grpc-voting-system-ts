import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

async function bootstrap() {
  console.log(process.env['auth_service'], 'AUTH');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:3001', // process.env['auth_service'],
        package: AUTH_PACKAGE_NAME,
        protoPath: join(process.cwd(), 'proto', 'auth.proto'),
      },
    },
  );
  await app.listen();
}
bootstrap();
