import { VoteCandidateRequest } from '@app/common';
import { IsNotEmpty, IsString } from 'class-validator';

export class VoteCandidateDto implements Omit<VoteCandidateRequest, 'userId'> {
  @IsString()
  @IsNotEmpty()
  candidateId: string;

  @IsString()
  @IsNotEmpty()
  electionId: string;
}
