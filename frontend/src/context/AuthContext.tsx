'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { useMutation, useQuery, UseMutationResult, UseQueryOptions } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { loginUser, logoutUser, fetchUser } from '@/utils/api/auth';
import { AuthContextType } from '@/types/authContext';
import { LoginCredentials, LoginResponse, User } from '@/types/auth';

// Default value for the context
const defaultAuthContext: AuthContextType = {
  user: null,
  loading: true,
  setUser: () => {},
  loginMutation: {} as UseMutationResult<LoginResponse, Error, LoginCredentials>,
  logout: () => Promise.resolve(),
  error: null,
};

// Create the context
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// AuthProvider Component
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch user query
  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: fetchUser,
    enabled: !!Cookies.get('token'), // Only fetch if token exists
    onSuccess: (data: User) => {
      if (data && typeof data === 'object' && data.id) {
        setCurrentUser(data);
      } else {
        setError('User data is invalid.');
      }
      setError(null);
    },
    onError: (error: Error) => {
      setError(error.message || 'Fetching user failed.');
    },
  } as UseQueryOptions<User, Error>); // Explicitly type the options here

  // Handle page reload by refetching user data if available
  useEffect(() => {
    if (data) {
      setCurrentUser(data);
    }
  }, [data]);

  // Login mutation
  const loginMutation = useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (credentials) => {
      const response = await loginUser(credentials);
      return response;
    },
    onSuccess: async (data) => {
      Cookies.set('token', data.token);
      setError(null);

      // Fetch user immediately after login
      try {
        const user = await fetchUser();
        setCurrentUser(user);
      } catch (error: unknown) {
        const message = (error as Error)?.message || 'Failed to fetch user after login.';
        setError(message);
      }
    },
    onError: (error: unknown) => {
      const message = (error as Error)?.message || 'Login failed, please try again.';
      setError(message);
    },
  });

  // Logout function
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
    setCurrentUser(null); // Clear user info on logout
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        loading: isLoading,
        setUser: setCurrentUser,
        loginMutation,
        logout,
        error: queryError?.message || error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
