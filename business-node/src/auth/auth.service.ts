import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './dtos/type/auth-reponse.type';
import { User } from 'src/football/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private getJwtToken(userId: string) {
    return this.jwtService.sign({ id: userId });
  }

  async revalidateToken(user: User): Promise<AuthResponse> {
    const token = this.getJwtToken(user.id);
    return { user, token };
  }
}
