import {
  GetVoteReponse,
  GetVoteRequest,
  VoteCandidateRequest,
  VoteCandidateResponse,
} from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vote } from './vote.model';
import { Model } from 'mongoose';
import { GrpcAlreadyExistsException } from 'nestjs-grpc-exceptions';

@Injectable()
export class VoteService {
  constructor(@InjectModel(Vote.name) private voteModel: Model<Vote>) { }

  async voteCandidate(
    request: VoteCandidateRequest,
  ): Promise<VoteCandidateResponse> {
    const isExist = await this.voteModel.findOne({
      userId: request.userId,
      electionId: request.electionId,
    });

    console.log({ isExist, request });

    if (isExist)
      throw new GrpcAlreadyExistsException(
        'you already attended to this election',
      );

    await this.voteModel.create({
      electionId: request.electionId,
      candidateId: request.candidateId,
      userId: request.userId,
    });

    return {
      isVoteRegister: true,
    };
  }

  async getVote(request: GetVoteRequest): Promise<GetVoteReponse> {
    const vote = await this.voteModel.findById(request.id);
    return vote.toJSON();
  }
}
