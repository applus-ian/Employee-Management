import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api/apiInstance';

interface Country {
  id: number;
  name: string;
  code: string;
}

interface Office {
  id: number;
  name: string;
  address: string;
}

interface Team {
  id: number;
  name: string;
  description: string;
}

interface Department {
  id: number;
  name: string;
  description: string;
}

export const useCountries = () => {
  return useQuery<Country[]>({
    queryKey: ['countries'],
    queryFn: async () => {
      const response = await api.get('/country-assigns/list');
      return response.data;
    },
  });
};

export const useOffices = () => {
  return useQuery<Office[]>({
    queryKey: ['offices'],
    queryFn: async () => {
      const response = await api.get('/office-assigns/list');
      return response.data;
    },
  });
};

export const useTeams = () => {
  return useQuery<Team[]>({
    queryKey: ['teams'],
    queryFn: async () => {
      const response = await api.get('/team-assigns/list');
      return response.data;
    },
  });
};

export const useDepartments = () => {
  return useQuery<Department[]>({
    queryKey: ['departments'],
    queryFn: async () => {
      const response = await api.get('/department-assigns/list');
      return response.data;
    },
  });
};
