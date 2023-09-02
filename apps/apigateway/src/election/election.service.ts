import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateElectionDto } from './dto/create-election.dto';
import { UpdateElectionDto } from './dto/update-election.dto';
import { ELECTION_SERVICE_NAME, ElectionServiceClient } from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class ElectionService implements OnModuleInit {
  private electionService: ElectionServiceClient;
  constructor(@Inject('ELECTION_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.electionService = this.client.getService<ElectionServiceClient>(
      ELECTION_SERVICE_NAME,
    );
  }

  create(createElectionDto: CreateElectionDto) {
    return this.electionService.createElection(createElectionDto);
  }

  findAll() {
    return this.electionService.getAllElections({});
  }

  findOne(id: string) {
    return this.electionService.getElectionById({ id });
  }

  update(id: string, updateElectionDto: UpdateElectionDto) {
    return this.electionService.updateElection({ id, ...updateElectionDto });
  }

  remove(id: string) {
    return this.electionService.deleteElection({ id });
  }
}
