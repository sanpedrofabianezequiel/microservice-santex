import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index(['email'], { unique: true })
@Entity({ name: 'users' })
@ObjectType()
@Directive('@key(fields: "id")')
export class User extends AbstractEntity<User> {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Field(() => String, { nullable: true })
  fullName: string;

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  @Field(() => String, { nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Field(() => String, { nullable: true })
  password: string;

  @Column({ type: 'text', array: true, default: ['USER'] })
  @Field(() => [String])
  roles: string[];

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.lastUpdatedBy, {
    nullable: true,
    lazy: true,
  })
  @JoinColumn({ name: 'last_updated_by' })
  @Field(() => User, { nullable: true })
  lastUpdatedBy?: User;
}
