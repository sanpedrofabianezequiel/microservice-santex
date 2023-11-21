import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CompetitionArea } from '../entity/competition-area.entity';
import { CompetitionPerson } from '../entity/competition-person.entity';
import { CompetitionCoach } from '../entity/competition-coach.entity';

@Injectable()
export class CompetitionCoachRepository extends AbstractRepository<CompetitionCoach> {
  protected readonly logger = new Logger(CompetitionCoach.name);

  constructor(
    @InjectRepository(CompetitionCoach)
    competitionCoachRepository: Repository<CompetitionCoach>,
    entityManager: EntityManager,
  ) {
    super(competitionCoachRepository, entityManager);
  }
}
 