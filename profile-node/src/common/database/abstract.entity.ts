import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AbstractEntity<T> {
  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
