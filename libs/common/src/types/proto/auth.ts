/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export enum Role {
  ADMIN = 0,
  USER = 1,
  UNRECOGNIZED = -1,
}

/** Requests */
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface VerifyTokenRequest {
  token: string;
}

/** Responses */
export interface LoginResponse {
  token?: string | undefined;
}

export interface RegisterResponse {
  token?: string | undefined;
}

export interface VerifyTokenResponse {
  user?: User | undefined;
}

/** Types */
export interface User {
  id: string;
  username: string;
  password: string;
  role: Role;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  login(request: LoginRequest): Observable<LoginResponse>;

  register(request: RegisterRequest): Observable<RegisterResponse>;

  verifyToken(request: VerifyTokenRequest): Observable<VerifyTokenResponse>;
}

export interface AuthServiceController {
  login(request: LoginRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  register(request: RegisterRequest): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  verifyToken(
    request: VerifyTokenRequest,
  ): Promise<VerifyTokenResponse> | Observable<VerifyTokenResponse> | VerifyTokenResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["login", "register", "verifyToken"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
