import { Module } from '@nestjs/common';
import { ElectionService } from './election.service';
import { ElectionController } from './election.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ELECTION_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ELECTION_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:3003',
          package: ELECTION_PACKAGE_NAME,
          protoPath: join(process.cwd(), 'proto', 'election.proto'),
        },
      },
    ]),
  ],
  controllers: [ElectionController],
  providers: [ElectionService],
})
export class ElectionModule {}
