import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UserService } from './users.service';
import { DatabaseModule } from 'src/common/database/database.module';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([User])],
  providers: [UsersResolver, UserService, CommonModule, UserRepository],
  exports: [UsersResolver, UserService, CommonModule, UserRepository],
})
export class UserModule {}
