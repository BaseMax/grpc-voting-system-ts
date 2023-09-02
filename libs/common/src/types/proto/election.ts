/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "election";

/** requests */
export interface CreateElectionRequest {
  title: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface GetAllElectionRequest {
}

export interface GetElectionByIdRequest {
  id: string;
}

export interface UpdateElectionRequest {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface DeleteElectionRequest {
  id: string;
}

/** responses */
export interface CreateELectionResponse {
  election?: Election | undefined;
}

export interface GetElectionByIdResponse {
  election?: Election | undefined;
}

export interface UpdateElectionResponse {
  election?: Election | undefined;
}

export interface DeleteElectionResponse {
  deletedCount: number;
}

export interface GetAllElectionResponse {
  elections: Election[];
}

/** typee */
export interface Election {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export const ELECTION_PACKAGE_NAME = "election";

/** services */

export interface ElectionServiceClient {
  createElection(request: CreateElectionRequest): Observable<CreateELectionResponse>;

  getAllElections(request: GetAllElectionRequest): Observable<GetAllElectionResponse>;

  getElectionById(request: GetElectionByIdRequest): Observable<GetElectionByIdResponse>;

  updateElection(request: UpdateElectionRequest): Observable<UpdateElectionResponse>;

  deleteElection(request: DeleteElectionRequest): Observable<DeleteElectionResponse>;
}

/** services */

export interface ElectionServiceController {
  createElection(
    request: CreateElectionRequest,
  ): Promise<CreateELectionResponse> | Observable<CreateELectionResponse> | CreateELectionResponse;

  getAllElections(
    request: GetAllElectionRequest,
  ): Promise<GetAllElectionResponse> | Observable<GetAllElectionResponse> | GetAllElectionResponse;

  getElectionById(
    request: GetElectionByIdRequest,
  ): Promise<GetElectionByIdResponse> | Observable<GetElectionByIdResponse> | GetElectionByIdResponse;

  updateElection(
    request: UpdateElectionRequest,
  ): Promise<UpdateElectionResponse> | Observable<UpdateElectionResponse> | UpdateElectionResponse;

  deleteElection(
    request: DeleteElectionRequest,
  ): Promise<DeleteElectionResponse> | Observable<DeleteElectionResponse> | DeleteElectionResponse;
}

export function ElectionServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createElection",
      "getAllElections",
      "getElectionById",
      "updateElection",
      "deleteElection",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ElectionService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ElectionService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ELECTION_SERVICE_NAME = "ElectionService";
