import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { ValidRoles } from './enums/valid-roles.enum';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthResponse } from './dtos/type/auth-reponse.type';
import { User } from 'src/football/entity/user.entity';

@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AuthResponse, { name: 'revalidateToken' })
  @UseGuards(JwtAuthGuard)
  async revalidateToken(
    @CurrentUser([ValidRoles.USER]) user: User,
  ): Promise<AuthResponse> {
    return this.authService.revalidateToken(user);
  }
}
