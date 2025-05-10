'use client';

import React, { createContext, useState, ReactNode } from 'react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { loginUser, logoutUser, fetchUser } from '@/utils/api/auth';
import { AuthContextType } from '@/types/authContext';
import { LoginCredentials, LoginResponse, User } from '@/types/auth';

const defaultAuthContext: AuthContextType = {
  user: null,
  loading: true,
  setUser: () => {},
  loginMutation: {} as UseMutationResult<LoginResponse, Error, LoginCredentials>,
  logout: () => Promise.resolve(),
  error: null,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);

  // Correct useQuery setup
  const { data: user, isLoading } = useQuery<User, Error, User, readonly string[]>({
    queryKey: ['user'], // Query key
    queryFn: fetchUser, // Query function
    enabled: !!Cookies.get('token'), // Only run the query if the token exists
    onError: (error: unknown) => {
      const message = (error as Error)?.message || 'Fetching user failed.';
      setError(message);
    },
    onSuccess: () => {
      setError(null);
    },
  } as UseQueryOptions<User, Error, User, readonly string[]>);

  const loading = isLoading;

  // Ensure user is never undefined by using null instead of undefined
  const currentUser = user ?? null;

  // Handle login
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<LoginResponse> => {
      const response = await loginUser(credentials);
      return response;
    },
    onSuccess: (data) => {
      Cookies.set('token', data.token);
      setError(null);
    },
    onError: (error: unknown) => {
      const message = (error as Error)?.message || 'Login failed, please try again.';
      setError(message);
    },
  });

  // Handle logout
  const logout = async () => {
    const token = Cookies.get('token');
    if (token) {
      try {
        await logoutUser();
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred.');
        }
      }
    }
    Cookies.remove('token');
  };

  return (
    <AuthContext.Provider value={{ user: currentUser, loading, setUser: () => {}, loginMutation, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
