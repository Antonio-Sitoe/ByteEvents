export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'participant';
  created_at: string;
  updated_at: string;
}

export interface IAuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: IUser | null;
}
