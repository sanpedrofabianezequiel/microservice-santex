import {
  Args,
  ID,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { User } from './entity/user.entity';
import { UserService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { ValidRolesArgs } from './dtos/args/roles.args';
import { UpdateUserInput } from './dtos/inputs/update-user.input';

@Resolver((of) => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private usersService: UserService) {}

  @Query(() => User, { name: 'Get_user_by_id' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser([ValidRoles.USER]) user: User,
  ): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Query(() => [User], {
    name: 'Get_users_based_on_specified_roles_or_all_users_if_no_roles_are_provided',
  })
  async findByRoles(
    @Args() validRoles: ValidRolesArgs,
    @CurrentUser([ValidRoles.USER]) user: User,
  ): Promise<User[]> {
    return await this.usersService.findByRoles(validRoles.roles);
  }

  /*

 

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser([ValidRoles.USER]) user: User,
  ): Promise<User> {
    return this.usersService.updateUser({
      id: updateUserInput.id,
      updateUserInput: updateUserInput,
      updateBy: user,
    });
  }

  @Mutation(() => User, { name: 'blockUser' })
  async blockUser(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser([ValidRoles.USER]) user: User,
  ): Promise<User> {
    return this.usersService.blockUser(id, user);
  }*/
}
