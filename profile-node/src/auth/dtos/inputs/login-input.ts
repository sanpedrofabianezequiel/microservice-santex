import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class SignInInput {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { description: 'The email of the user', name: 'email' })
  @Type(() => String)
  readonly email: string;

  @IsNotEmpty()
  @Field(() => String, {
    description: 'The password of the user',
    name: 'password',
  })
  @MinLength(6)
  @Type(() => String)
  readonly password: string;
}
