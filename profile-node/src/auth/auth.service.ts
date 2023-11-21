import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/users/users.service';
import { AuthResponse } from './dtos/types/auth-response.type';
import { SignUpInput } from './dtos/inputs/signup-input';
import { SignInInput } from './dtos/inputs/login-input';
import { User } from 'src/users/entity/user.entity';
import { IPutJwtCommand } from './interfaces/put-jwt-command.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private putJwtCommand(input: IPutJwtCommand) {
    return this.jwtService.sign(input);
  }
  async signUp(signUpInput: SignUpInput): Promise<AuthResponse> {
    try {
      const user = await this.userService.create(signUpInput);
      const input = {
        id: user.id,
        roles: user.roles,
      };
      const token = this.putJwtCommand(input);
      const result = { user, token };
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async signIn(loginInput: SignInInput): Promise<AuthResponse> {
    const user = await this.userService.findOneByEmail(loginInput.email);
    if (!bcrypt.compareSync(loginInput.password, user.password)) {
      throw new BadRequestException('Invalid credentials');
    }
    const input = {
      id: user.id,
      roles: user.roles,
    };
    const token = this.putJwtCommand(input);
    const result = { user, token };
    return result;
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user.isActive) {
      throw new UnauthorizedException('User is not active');
    }
    delete user.password;
    return user;
  }

  async revalidateToken(user: User): Promise<AuthResponse> {
    try {
      const input = {
        id: user.id,
        roles: user.roles,
      };
      const token = this.putJwtCommand(input);
      const result = { user, token };
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
