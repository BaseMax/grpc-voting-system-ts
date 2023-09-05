import { Controller } from '@nestjs/common';
import { VoteService } from './vote.service';
import {
  GetVoteReponse,
  GetVoteRequest,
  VoteCandidateRequest,
  VoteCandidateResponse,
  VoteServiceController,
  VoteServiceControllerMethods,
} from '@app/common';

@Controller()
@VoteServiceControllerMethods()
export class VoteController implements VoteServiceController {
  constructor(private readonly voteService: VoteService) { }

  voteCandidate(request: VoteCandidateRequest): Promise<VoteCandidateResponse> {
    return this.voteService.voteCandidate(request);
  }

  getVote(request: GetVoteRequest): Promise<GetVoteReponse> {
    return this.voteService.getVote(request);
  }
}
