import {
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AbstractEntity } from './abstract.entity';
import {
  EntityManager,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
  protected abstract readonly logger: Logger;

  constructor(
    private readonly entityRepository: Repository<T>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(input: T): Promise<T> {
    try {
      return await this.entityRepository.save(input);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(
    where: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
  ): Promise<T> {
    try {
      const entity = await this.entityRepository.findOne({ where, relations });

      if (!entity) {
        this.logger.warn('Document not found with where', where);
        throw new NotFoundException('Entity not found.');
      }
      return entity;
    } catch (error) {
      throw new NotFoundException('Entity not found.');
    }
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<T> {
    const updateResult = await this.entityRepository.update(
      where,
      partialEntity,
    );

    if (!updateResult.affected) {
      this.logger.warn('Entity not found with where', where);
      throw new NotFoundException('Entity not found.');
    }

    return this.findOne(where);
  }

  async findBy(where: FindOptionsWhere<T>): Promise<T[]> {
    try {
      return await this.entityRepository.findBy(where);
    } catch (error) {
      throw new NotFoundException('Entity not found.');
    }
  }

  async find(
    where: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
  ): Promise<T[]> {
    try {
      return await this.entityRepository.find({ where, relations });
    } catch (error) {
      throw new NotFoundException('Entity not found.');
    }
  }

  async findQueryBuilder(
    where: string,
    expressionAttributeNames: string,
    expressionAttributeValues: string[],
  ) {
    try {
      return await this.entityRepository
        .createQueryBuilder()
        .andWhere(where)
        .setParameter(expressionAttributeNames, expressionAttributeValues)
        .getMany();
    } catch (error) {
      throw new NotFoundException('Entity not found.');
    }
  }

  async preload(input: T): Promise<T> {
    try {
      return await this.entityRepository.preload(input);
    } catch (error) {
      throw new NotFoundException('Entity not found.');
    }
  }

  async save(input: T): Promise<T> {
    try {
      return await this.entityRepository.save(input);
    } catch (error) {
      throw new NotFoundException('Entity not found.');
    }
  }

  async findOneAndDelete(where: FindOptionsWhere<T>): Promise<void> {
    try {
      await this.entityRepository.delete(where);
    } catch (error) {
      throw new NotFoundException('Entity not found.');
    }
  }

  async count(where: FindOptionsWhere<T>): Promise<number> {
    try {
      return await this.entityRepository.count({ where });
    } catch (error) {
      throw new NotFoundException('Entity not found.');
    }
  }

  async exists(where: FindOptionsWhere<T>): Promise<boolean> {
    return !!(await this.count(where));
  }

  async findOneByOrFail(where: FindOptionsWhere<T>): Promise<T> {
    try {
      return await this.entityRepository.findOneOrFail({ where });
    } catch (error) {
      throw new NotFoundException('Entity not found.');
    }
  }
}
