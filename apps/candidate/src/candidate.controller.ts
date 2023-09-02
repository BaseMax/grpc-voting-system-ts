import { Controller } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import {
  AddCandidateRequest,
  AddCandidateResponse,
  CandidateServiceControllerMethods,
  GetAllCandidateRequest,
  GetOneCandidateRequest,
  GetOneCandidateResponse,
  UpdateCandidateRequest,
  UpdateCandidateResponse,
} from '@app/common';

@Controller()
@CandidateServiceControllerMethods()
export class CandidateController {
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

  getAllCandidates(request: GetAllCandidateRequest) {
    return this.candidateService.getAllCandidates(request);
  }
}
