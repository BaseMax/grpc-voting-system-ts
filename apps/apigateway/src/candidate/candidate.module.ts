import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CANDIDATE_PACKAGE_NAME } from '@app/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CANDIDATE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:3002',
          protoPath: join(process.cwd(), 'proto', 'candidate.proto'),
          package: CANDIDATE_PACKAGE_NAME,
        },
      },
    ]),
  ],
  controllers: [CandidateController],
  providers: [CandidateService],
})
export class CandidateModule {}
