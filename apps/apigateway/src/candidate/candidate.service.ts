import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { CANDIDATE_SERVICE_NAME, CandidateServiceClient } from '@app/common';
import { ReplaySubject, retry } from 'rxjs';

@Injectable()
export class CandidateService implements OnModuleInit {
  private candidateService: CandidateServiceClient;
  constructor(@Inject('CANDIDATE_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.candidateService = this.client.getService<CandidateServiceClient>(
      CANDIDATE_SERVICE_NAME,
    );
  }

  create(createCandidateDto: CreateCandidateDto) {
    console.log({ createCandidateDto });

    return this.candidateService.addCandidate(createCandidateDto);
  }

  findAll() {
    return this.candidateService.getAllCandidates({});
  }

  findOne(id: string) {
    return this.candidateService.getOneCandidate({ id });
  }

  update(id: string, updateCandidateDto: UpdateCandidateDto) {
    return this.candidateService.updateCandidate({ id, ...updateCandidateDto });
  }
}
