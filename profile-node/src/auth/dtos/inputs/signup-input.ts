import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class SignUpInput {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { description: 'The email of the user', name: 'email' })
  @Type(() => String)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, {
    description: 'The full name of the user',
    name: 'fullName',
  })
  @Type(() => String)
  readonly fullName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Field(() => String, {
    description: 'The password of the user',
    name: 'password',
  })
  @Type(() => String)
  readonly password: string;
}
