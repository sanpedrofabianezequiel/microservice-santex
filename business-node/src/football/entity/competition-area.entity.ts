import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IFootball } from '../interfaces/football.interface';
import { IUser } from '../interfaces/user.interface';
import { User } from './user.entity';
import { IFootbalTeamResponse } from '../interfaces/football-team.response.interface';
import { ICompetition } from '../interfaces/competition.interface';
import { Football } from './football.entity';
import { ICompetitionArea } from '../interfaces/competition-area.interface';

@Index(['id'], { unique: true })
@Entity({ name: 'competitionArea' })
@ObjectType()
@Directive('@key(fields: "id")')
export class CompetitionArea
  extends AbstractEntity<CompetitionArea>
  implements ICompetitionArea
{
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID || String)
  id: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  code: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  flag: string;
  
}
