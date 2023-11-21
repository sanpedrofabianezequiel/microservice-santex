import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CompetitionArea } from '../entity/competition-area.entity';
import { CompetitionTeam } from '../entity/competition-team.entity';

@Injectable()
export class CompetitionTeamRepository extends AbstractRepository<CompetitionTeam> {
  protected readonly logger = new Logger(CompetitionTeam.name);

  constructor(
    @InjectRepository(CompetitionTeam)
    competitionTeamRepository: Repository<CompetitionTeam>,
    entityManager: EntityManager,
  ) {
    super(competitionTeamRepository, entityManager);
  }
}
