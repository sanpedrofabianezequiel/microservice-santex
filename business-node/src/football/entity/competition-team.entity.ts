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
import { CompetitionPerson } from './competition-person.entity';

@Index(['id'], { unique: true })
@Entity({ name: 'competitionTeam' })
@ObjectType()
@Directive('@key(fields: "id")')
export class CompetitionTeam
  extends AbstractEntity<CompetitionTeam>
  implements ICompetitionTeam
{
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID || String)
  id?: string;

  /*@ManyToOne(() => Competition, (competition) => competition.competitionTeams)
  @Field(() => Competition, { nullable: true })
  competition: Competition;
*/

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  idTeam: string;


  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  shortName: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  tla: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  address: string;

  @Column({ nullable: true, type: 'json' })
  @Field(() => CompetitionArea, { nullable: true })
  area: ICompetitionArea;

  @ManyToOne(() => Competition, (competition) => competition.competitionTeams)
  @Field(() => Competition, { nullable: true })
  competition: Competition;

  @OneToMany(
    () => CompetitionPerson,
    (competitionPerson) => competitionPerson.competitionTeam,
    { eager: true, cascade: true },
  )
  @Field(() => [CompetitionPerson], { nullable: true })
  competitionPersons: CompetitionPerson[];
}
