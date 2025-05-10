// Interface for user data
export interface User {
  id: number;
  name: string;
  email: string;
}

// Interface for login request credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Interface for login response
export interface LoginResponse {
  token: string;
  user: User;
}
