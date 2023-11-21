import { Field, ObjectType } from '@nestjs/graphql';
import { IAuthResponse } from 'src/auth/interfaces/auth-response.interface';
import { User } from 'src/football/entity/user.entity';

@ObjectType()
export class AuthResponse implements IAuthResponse {
  @Field(() => String)
  token: string;

  @Field(() => User)
  user: User;
}
