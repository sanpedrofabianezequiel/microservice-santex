import { IUser } from './user.interface';

export interface IFootball {
  id?: string;

  leagueCode: string;

  userId: string;

  user?: IUser;
}
