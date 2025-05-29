import api from '@/utils/api/apiInstance';
import { z } from 'zod';
import { createEmployeeSchema } from '@/schemas/records/createEmployee';

export type CreateRecordData = z.infer<typeof createEmployeeSchema>;

export type ActivateAccountData = {
  employeeId: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export const createRecord = async (data: CreateRecordData) => {
  const response = await api.post('/employees/new', data);
  return response.data;
};

export const activateAccount = async (data: ActivateAccountData) => {
  const response = await api.post('/records/activate', data);
  return response.data;
};
