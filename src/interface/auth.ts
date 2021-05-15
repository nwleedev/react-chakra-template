export interface IUser {
  id: number;
  email: string;
  username: string;
  createdAt?: Date;
}

export interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<IUser | null>;
}

export interface IUserResponse {
  user: IUser;
  accessToken: string;
}

export interface ILoginResponse {
  user: IUser;
  tokens: {
    accessToken: string;
    none: string;
  };
}
