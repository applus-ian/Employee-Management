import { api } from '@/utils/api/apiInstance';
import { Documentation } from '@/types/records/record';

export const fetchDocumentations = async (employeeId: string): Promise<Documentation[]> => {
  const response = await api.get(`/documentations/list?employee_id=${employeeId}`);
  return response.data;
};

export const createDocumentation = async (formData: FormData): Promise<Documentation> => {
  const response = await api.post('/documentations/new', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateDocumentation = async (id: string, formData: FormData): Promise<Documentation> => {
  const response = await api.put(`/documentations/update/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteDocumentation = async (id: string): Promise<void> => {
  await api.delete(`/documentations/delete/${id}`);
};
