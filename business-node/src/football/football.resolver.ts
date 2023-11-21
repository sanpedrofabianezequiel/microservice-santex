import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { Football } from './entity/football.entity';
import { FootballService } from './football.service';
import { CreateFootballInput } from './dtos/inputs/create-football.input';
import { User } from './entity/user.entity';

@Resolver((of) => Football)
//@UseGuards(JwtAuthGuard)
export class FootballResolver {
  constructor(private footballService: FootballService) {}

  @Mutation(() => Football, { name: 'CreateImportLeague' })
  async create(
    @Args('CreateFootballInput')
    createFootballInput: CreateFootballInput,
  ): Promise<Football> {
    return await this.footballService.create(createFootballInput);
  }

  @Query(() => Football, { name: 'GetPlayersByLeagueCode' })
  async findOne(
    @Args('leagueCode', { type: () => String }, ) leagueCode: string,
    //@CurrentUser([ValidRoles.USER]) user: User,
  ): Promise<Football> {
    return await this.footballService.findPlayerByLeagueCode(leagueCode);
  }

  @ResolveField(() => User)
  user(@Parent() football: Football): any {
    return { __typename: User.name, id: football.userId };
  }
}
