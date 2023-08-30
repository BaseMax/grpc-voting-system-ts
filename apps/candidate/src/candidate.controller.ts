import { Controller } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import {
  AddCandidateRequest,
  AddCandidateResponse,
  Candidate,
  CandidateServiceController,
  CandidateServiceControllerMethods,
  GetAllCandidateRequest,
  GetOneCandidateRequest,
  GetOneCandidateResponse,
  UpdateCandidateRequest,
  UpdateCandidateResponse,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@CandidateServiceControllerMethods()
export class CandidateController implements CandidateServiceController {
  constructor(private readonly candidateService: CandidateService) {}

  addCandidate(request: AddCandidateRequest): Promise<AddCandidateResponse> {
    return this.candidateService.addCandidate(request);
  }

  async updateCandidate(
    request: UpdateCandidateRequest,
  ): Promise<UpdateCandidateResponse> {
    return this.candidateService.updateCandidate(request);
  }

  getOneCandidate(
    request: GetOneCandidateRequest,
  ): Promise<GetOneCandidateResponse> {
    return this.candidateService.getOneCandidate(request);
  }

  getAllCandidates(request: GetAllCandidateRequest): Observable<Candidate> {
    throw new Error('Method Not implemented');
    // return this.candidateService.getAllCandidates(request);
  }
}
