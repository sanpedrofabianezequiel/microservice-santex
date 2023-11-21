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
import { ICompetitionTeam } from '../interfaces/competition-team.interface';
import { CompetitionTeam } from './competition-team.entity';

@Index(['id'], { unique: true })
@Entity({ name: 'competition' })
@ObjectType()
@Directive('@key(fields: "id")')
export class Competition
  extends AbstractEntity<Competition>
  implements ICompetition
{
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID || String)
  id?: string;

  @ManyToOne(() => Football, (football) => football.competitions, {
    lazy: true,
  })
  @Field(() => Football, { nullable: true })
  football?: Football;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  type?: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  code: string;

  @Column({ nullable: true, type: 'json' })
  @Field(() => CompetitionArea, { nullable: true })
  area?: ICompetitionArea;

  @OneToMany(
    () => CompetitionTeam,
    (competitionTeam) => competitionTeam.competition,
    { eager: true, cascade: true },
  )
  @Field(() => [CompetitionTeam], { nullable: true })
  competitionTeams?: ICompetitionTeam[];
}
