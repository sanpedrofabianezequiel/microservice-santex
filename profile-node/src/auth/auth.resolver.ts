import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { ValidRoles } from './enums/valid-roles.enum';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthResponse } from './dtos/types/auth-response.type';
import { SignInInput } from './dtos/inputs/login-input';
import { SignUpInput } from './dtos/inputs/signup-input';
import { User } from 'src/users/entity/user.entity';

@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signUp' })
  async signUp(
    @Args('signUpInput') signUpInput: SignUpInput,
  ): Promise<AuthResponse> {
    return await this.authService.signUp(signUpInput);
  }

  @Mutation(() => AuthResponse, { name: 'signIn' })
  async signIn(
    @Args('signInInput') signInInput: SignInInput,
  ): Promise<AuthResponse> {
    return await this.authService.signIn(signInInput);
  }

  @Query(() => AuthResponse, { name: 'revalidateToken' })
  @UseGuards(JwtAuthGuard)
  async revalidateToken(
    @CurrentUser([ValidRoles.USER]) user: User,
  ): Promise<AuthResponse> {
    return this.authService.revalidateToken(user);
  }
}
