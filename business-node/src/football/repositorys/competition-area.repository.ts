import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CompetitionArea } from '../entity/competition-area.entity';

@Injectable()
export class CompetitionAreaRepository extends AbstractRepository<CompetitionArea> {
  protected readonly logger = new Logger(CompetitionArea.name);

  constructor(
    @InjectRepository(CompetitionArea)
    competitionAreaRepository: Repository<CompetitionArea>,
    entityManager: EntityManager,
  ) {
    super(competitionAreaRepository, entityManager);
  }
}
