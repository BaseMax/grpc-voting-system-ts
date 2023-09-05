import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateElectionDto } from './dto/create-election.dto';
import { UpdateElectionDto } from './dto/update-election.dto';
import {
  ELECTION_SERVICE_NAME,
  ElectionServiceClient,
  VOTE_SERVICE_NAME,
  VoteServiceClient,
} from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { VoteCandidateDto } from './dto/vote-candidate.dto';

@Injectable()
export class ElectionService implements OnModuleInit {
  private electionService: ElectionServiceClient;
  private voteService: VoteServiceClient;
  constructor(
    @Inject('ELECTION') private clientElection: ClientGrpc,
    @Inject('VOTE') private clientVote: ClientGrpc,
  ) { }

  onModuleInit() {
    this.electionService =
      this.clientElection.getService<ElectionServiceClient>(
        ELECTION_SERVICE_NAME,
      );
    this.voteService =
      this.clientVote.getService<VoteServiceClient>(VOTE_SERVICE_NAME);
  }

  voteCandidate(request: VoteCandidateDto, userId: string) {
    return this.voteService.voteCandidate({ ...request, userId });
  }

  getVote(id: string) {
    return this.voteService.getVote({ id });
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
