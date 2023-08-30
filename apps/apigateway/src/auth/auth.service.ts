import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { AUTH_SERVICE_NAME, AuthServiceClient } from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient;
  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async login(request: LoginDto) {
    return this.authService.login(request);
  }
  async register(request: RegisterDto) {
    return this.authService.register(request);
  }
}
