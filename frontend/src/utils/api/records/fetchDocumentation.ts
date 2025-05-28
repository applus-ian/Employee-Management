import { api } from '@/utils/api/apiInstance';
import { Documentation } from '@/types/records/record';

export const fetchDocumentations = async (employeeId: string): Promise<Documentation[]> => {
  const response = await api.get(`/documentations/employee/${employeeId}`);
  return response.data;
};

export const createDocumentation = async (formData: FormData): Promise<Documentation> => {
  const response = await api.post('/documentations', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateDocumentation = async (id: number, formData: FormData): Promise<Documentation> => {
  const response = await api.put(`/documentations/update/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteDocumentation = async (id: number): Promise<void> => {
  await api.delete(`/documentations/delete/${id}`);
};
