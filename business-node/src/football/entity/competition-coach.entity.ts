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
import { CompetitionArea } from './competition-area.entity';
import {
  ICompetitionTeam,
  ICompetitionTeamResponse,
  Season,
} from '../interfaces/competition-team.interface';
import { number } from 'joi';
import { Competition } from './competition.entity';
import { ICompetitionPerson } from '../interfaces/competition-person.interface';
import { CompetitionTeam } from './competition-team.entity';
import { ICompetitionCoach } from '../interfaces/competition-coach.interface';

@Index(['id'], { unique: true })
@Entity({ name: 'competitionCoach' })
@ObjectType()
@Directive('@key(fields: "id")')
export class CompetitionCoach
  extends AbstractEntity<CompetitionCoach>
  implements ICompetitionCoach
{
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID || String)
  id: string;

  @Column({ nullable: false })
  @Field(() => String)
  name: string;

  @Column({ nullable: false })
  @Field(() => String)
  dateOfBirth: string;

  @Column({ nullable: false })
  @Field(() => String)
  nationality: string;
}
