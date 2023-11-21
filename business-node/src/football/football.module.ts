import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { CommonModule } from 'src/common/common.module';
import { FootballResolver } from './football.resolver';
import { FootballService } from './football.service';
import { FootballRepository } from './football.repository';
import { Football } from './entity/football.entity';
import { Competition } from './entity/competition.entity';
import { CompetitionArea } from './entity/competition-area.entity';
import { CompetitionTeam } from './entity/competition-team.entity';
import { CompetitionPerson } from './entity/competition-person.entity';
import { CompetitionRepository } from './repositorys/competition.repository';
import { CompetitionAreaRepository } from './repositorys/competition-area.repository';
import { CompetitionTeamRepository } from './repositorys/competition-team.repository';
import { CompetitionPersonRepository } from './repositorys/competition-person.repository';
import { CompetitionCoachRepository } from './repositorys/competition-coach.repository';
import { CompetitionCoach } from './entity/competition-coach.entity';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([Football,Competition,CompetitionArea,CompetitionTeam,CompetitionPerson,CompetitionCoach])],
  providers: [
    FootballResolver,
    FootballService,
    CommonModule,
    FootballRepository,
    CompetitionRepository,
    CompetitionAreaRepository,
    CompetitionTeamRepository,
    CompetitionPersonRepository,
    CompetitionCoachRepository
  ],
  exports: [
    FootballResolver,
    FootballService,
    CommonModule,
    FootballRepository,
    CompetitionRepository,
    CompetitionAreaRepository,
    CompetitionTeamRepository,
    CompetitionPersonRepository,
    CompetitionCoachRepository
  ],
})
export class FootballModule {}
