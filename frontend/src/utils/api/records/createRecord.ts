import api from '@/utils/api/apiInstance';
import { z } from 'zod';
import { createEmployeeSchema } from '@/schemas/records/createEmployee';

export type CreateRecordData = z.infer<typeof createEmployeeSchema>;

export type ActivateAccountData = {
  employee_id: string;
  email: string;
  user_role: number;
  password: string;
  password_confirmation: string;
};

export const createRecord = async (data: CreateRecordData) => {
  const response = await api.post('/employees/new', data);
  return response.data;
};

export const activateAccount = async (data: ActivateAccountData) => {
  const response = await api.put('/users/activate', data);
  return response.data;
};
