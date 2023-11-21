import { registerEnumType } from '@nestjs/graphql';

export enum ValidRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

registerEnumType(ValidRoles, {
  name: 'ValidRoles',
  description: 'Valid Roles',
});
