export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export interface UserAuth {
  email: string;
  password: string;
}

export interface UserAuthResponse {
  token: string;
}

export interface LoggedUser {
  userId: number;
  name: string;
  email: string;
  iat: number;
  exp: number;
}
