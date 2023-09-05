/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

/** requests */
export interface VoteCandidateRequest {
  candidateId: string;
  electionId: string;
  userId: string;
}

export interface GetVoteRequest {
  id: string;
}

/** responses */
export interface VoteCandidateResponse {
  isVoteRegister: boolean;
}

export interface GetVoteReponse {
  id: string;
  candidateId: string;
  electionId: string;
  userId: string;
}

/** types */
export interface Vote {
  id: string;
  candidateId: string;
  electionId: string;
  userId: string;
}

export const VOTE_PACKAGE_NAME = "vote";

/** services */

export interface VoteServiceClient {
  voteCandidate(request: VoteCandidateRequest): Observable<VoteCandidateResponse>;

  getVote(request: GetVoteRequest): Observable<GetVoteReponse>;
}

/** services */

export interface VoteServiceController {
  voteCandidate(
    request: VoteCandidateRequest,
  ): Promise<VoteCandidateResponse> | Observable<VoteCandidateResponse> | VoteCandidateResponse;

  getVote(request: GetVoteRequest): Promise<GetVoteReponse> | Observable<GetVoteReponse> | GetVoteReponse;
}

export function VoteServiceControllerMethods() {
  return function(constructor: Function) {
    const grpcMethods: string[] = ["voteCandidate", "getVote"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("VoteService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("VoteService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const VOTE_SERVICE_NAME = "VoteService";
