export interface IUser {
  id?: string;

  name: string;

  email: string;

  password: string;

  roles: string[];

  isActivate: boolean;
}
