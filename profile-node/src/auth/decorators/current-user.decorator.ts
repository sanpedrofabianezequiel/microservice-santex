import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/users/entity/user.entity';
import { ValidRoles } from '../enums/valid-roles.enum';

export const CurrentUser = createParamDecorator(
  (data: ValidRoles[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user: User = ctx.getContext().req.user;
    if (!user) {
      return new InternalServerErrorException(
        `No user inside the request -make sure that we used the AuthGuard`,
      );
    }

    if (data.length === 0) {
      return user;
    }

    //const hasRole = () => data.some((role) => user.roles?.includes(role));
    for (const role of user.roles) {
      if (data.includes(role.toUpperCase() as ValidRoles)) {
        return user;
      }
    }

    throw new ForbiddenException(
      `You don't have the required role to access this resource`,
    );
  },
);
