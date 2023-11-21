import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

enum League {
  PD = 'PD',
  CL = 'CL',
  PL = 'PL',
}

@InputType()
export class CreateFootballInput {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsEnum(League)
  @Type(() => String)
  readonly leagueCode: string;
}
