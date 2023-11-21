import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IFootball } from '../interfaces/football.interface';
import { IUser } from '../interfaces/user.interface';
import { User } from './user.entity';
import { IFootbalTeamResponse } from '../interfaces/football-team.response.interface';
import { Competition } from './competition.entity';
import { ICompetition } from '../interfaces/competition.interface';

@Index(['id'], { unique: true })
@Entity({ name: 'football'})
@ObjectType()
@Directive('@key(fields: "id")')
export class Football
  extends AbstractEntity<Football>
  implements IFootball
{
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID || String)
  id: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: false })
  leagueCode: string;

  @OneToMany(() => Competition, (competition) => competition.football,{eager: true, cascade: true})
  @Field(() => [Competition], { nullable: true })
  competitions: ICompetition[];

  @Column({ nullable: true, type: 'text' })
  @Field(() => String, { nullable: true })
  userId: string;

  @Field((type) => User, { nullable: true })
  user?: IUser;
}
