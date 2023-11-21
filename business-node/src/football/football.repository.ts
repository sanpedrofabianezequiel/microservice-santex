import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Football } from './entity/football.entity';

@Injectable()
export class FootballRepository extends AbstractRepository<Football> {
  protected readonly logger = new Logger(Football.name);

  constructor(
    @InjectRepository(Football)
    footballRepository: Repository<Football>,
    entityManager: EntityManager,
  ) {
    super(footballRepository, entityManager);
  }
}
