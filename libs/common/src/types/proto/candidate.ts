/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

/** requests */
export interface AddCandidateRequest {
  name: string;
  age: number;
  education?: string | undefined;
  website?: string | undefined;
  socialMedia: string[];
}

export interface UpdateCandidateRequest {
  id: string;
  name?: string | undefined;
  age?: number | undefined;
  education?: string | undefined;
  website?: string | undefined;
  socialMedia: string[];
}

export interface GetOneCandidateRequest {
  id: string;
}

export interface GetAllCandidateRequest {}

/** responses */
export interface AddCandidateResponse {
  candidate?: Candidate | undefined;
}

export interface UpdateCandidateResponse {
  candidate?: Candidate | undefined;
}

export interface GetOneCandidateResponse {
  candidate?: Candidate | undefined;
}

export interface GetAllCandidateResponse {
  candidates: Candidate[];
}

/** types */
export interface Candidate {
  id: string;
  name: string;
  age: number;
  education?: string | undefined;
  website?: string | undefined;
  socialMedia: string[];
}

export const CANDIDATE_PACKAGE_NAME = 'candidate';

/** services */

export interface CandidateServiceClient {
  addCandidate(request: AddCandidateRequest): Observable<AddCandidateResponse>;

  updateCandidate(
    request: UpdateCandidateRequest,
  ): Observable<UpdateCandidateResponse>;

  getOneCandidate(
    request: GetOneCandidateRequest,
  ): Observable<GetOneCandidateResponse>;

  getAllCandidates(
    request: GetAllCandidateRequest,
  ): Observable<GetAllCandidateResponse>;
}

/** services */

export interface CandidateServiceController {
  addCandidate(
    request: AddCandidateRequest,
  ):
    | Promise<AddCandidateResponse>
    | Observable<AddCandidateResponse>
    | AddCandidateResponse;

  updateCandidate(
    request: UpdateCandidateRequest,
  ):
    | Promise<UpdateCandidateResponse>
    | Observable<UpdateCandidateResponse>
    | UpdateCandidateResponse;

  getOneCandidate(
    request: GetOneCandidateRequest,
  ):
    | Promise<GetOneCandidateResponse>
    | Observable<GetOneCandidateResponse>
    | GetOneCandidateResponse;

  getAllCandidates(
    request: GetAllCandidateRequest,
  ):
    | Promise<GetAllCandidateResponse>
    | Observable<GetAllCandidateResponse>
    | GetAllCandidateResponse;
}

export function CandidateServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'addCandidate',
      'updateCandidate',
      'getOneCandidate',
      'getAllCandidates',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('CandidateService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('CandidateService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const CANDIDATE_SERVICE_NAME = 'CandidateService';
