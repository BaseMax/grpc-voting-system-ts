import {
  LoginRequest,
  RegisterRequest,
  Role,
  VerifyTokenRequest,
  VerifyTokenResponse,
} from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import {
  GrpcAlreadyExistsException,
  GrpcUnauthenticatedException,
} from 'nestjs-grpc-exceptions';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async register(request: RegisterRequest) {
    const existUser = await this.findUserByUsername(request.username);

    if (existUser)
      throw new GrpcAlreadyExistsException('user with this username exists');

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(request.password, salt);

    const user = await this.userModel.create({
      ...request,
      password: hashPassword,
      role: Role.USER,
    });

    const token = await this.jwtService.signAsync({ userId: user.id });

    return { token };
  }

  async login(request: LoginRequest) {
    const user = await this.findUserByUsername(request.username);
    if (!user) throw new GrpcUnauthenticatedException('wrong credentials');

    const isPasswordCorrect = await bcrypt.compare(
      request.password,
      user.password,
    );

    if (!isPasswordCorrect)
      throw new GrpcUnauthenticatedException('wrong credentials');

    const token = await this.jwtService.signAsync({ userId: user.id });

    return { token };
  }

  async verifyToken(request: VerifyTokenRequest): Promise<VerifyTokenResponse> {
    try {
      const decoded = await this.jwtService.verifyAsync(request.token);
      const user = await this.userModel.findById(decoded.userId);
      return { user: user.toJSON() };
    } catch (error) {
      throw new GrpcUnauthenticatedException('invalid token');
    }
  }

  private findUserByUsername(username: string) {
    return this.userModel.findOne({ username });
  }
}
