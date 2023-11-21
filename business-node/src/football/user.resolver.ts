import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Football } from './entity/football.entity';
import { User } from './entity/user.entity';
import { FootballService } from './football.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private readonly machineLearningService: FootballService,
  ) {}

  @ResolveField((of) => [Football])
  async machineLearnings(@Parent() user: User): Promise<Football[]> {
    return await this.machineLearningService.find(user.id);
  }
}
