import { NestFactory } from '@nestjs/core';
import { CandidateModule } from './candidate.module';

async function bootstrap() {
  const app = await NestFactory.create(CandidateModule);
  await app.listen(3000);
}
bootstrap();
