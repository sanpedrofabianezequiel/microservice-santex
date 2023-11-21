import { User } from 'src/football/entity/user.entity';

export interface IAuthResponse {
  token: string;
  user: User;
}
