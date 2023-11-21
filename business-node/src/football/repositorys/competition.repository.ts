import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Competition } from '../entity/competition.entity';

@Injectable()
export class CompetitionRepository extends AbstractRepository<Competition> {
  protected readonly logger = new Logger(Competition.name);

  constructor(
    @InjectRepository(Competition)
    competitionRepository: Repository<Competition>,
    entityManager: EntityManager,
  ) {
    super(competitionRepository, entityManager);
  }
}
