import { UseMutationResult } from '@tanstack/react-query';
import { LoginCredentials, LoginResponse, User } from './auth';

export interface AuthContextType {
  user: User | null;
  loading: boolean;

  setUser: (user: User | null) => void;
  loginMutation: UseMutationResult<LoginResponse, Error, LoginCredentials>;
  logout: () => void;
  error: string | null;
}
