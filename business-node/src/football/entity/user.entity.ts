import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Football } from './football.entity';
import { IFootball } from '../interfaces/football.interface';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field((type) => ID)
  @Directive('@external')
  id: string;

  @Field((type) => [Football])
  footballs?: IFootball[];
}
