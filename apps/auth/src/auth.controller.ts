import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyTokenRequest,
  VerifyTokenResponse,
} from '@app/common';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}
  login(request: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(request);
  }

  register(request: RegisterRequest): Promise<RegisterResponse> {
    return this.authService.register(request);
  }

  verifyToken(request: VerifyTokenRequest): Promise<VerifyTokenResponse> {
    return this.authService.verifyToken(request);
  }
}
