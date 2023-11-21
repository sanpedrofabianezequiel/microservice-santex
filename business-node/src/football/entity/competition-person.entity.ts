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

@Index(['id'], { unique: true })
@Entity({ name: 'competitionPerson' })
@ObjectType()
@Directive('@key(fields: "id")')
export class CompetitionPerson
  extends AbstractEntity<CompetitionPerson>
  implements ICompetitionPerson
{
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID || String)
  id: string;

  @ManyToOne(
    () => CompetitionTeam,
    (competition) => competition.competitionPersons,
    { lazy: true },
  )
  @Field(() => CompetitionTeam, { nullable: true })
  competitionTeam: CompetitionTeam;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  position: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  dateOfBirth: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  nationality: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  currentTeamId: string;
}
