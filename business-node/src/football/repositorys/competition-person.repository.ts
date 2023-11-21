import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CompetitionArea } from '../entity/competition-area.entity';
import { CompetitionPerson } from '../entity/competition-person.entity';

@Injectable()
export class CompetitionPersonRepository extends AbstractRepository<CompetitionPerson> {
  protected readonly logger = new Logger(CompetitionPerson.name);

  constructor(
    @InjectRepository(CompetitionPerson)
    competitionPersonRepository: Repository<CompetitionPerson>,
    entityManager: EntityManager,
  ) {
    super(competitionPersonRepository, entityManager);
  }
}
