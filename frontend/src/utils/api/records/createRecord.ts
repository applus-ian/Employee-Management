import api from '@/utils/api/apiInstance';

export type CreateRecordData = {
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  civilStatus: string;
  region: string;
  province: string;
  city: string;
  barangay: string;
  street: string;
  emergencyContact1: string;
  emergencyContact2?: string;
  jobPosition: string;
  locationAssignment: string;
  skills: string[];
};

export type ActivateAccountData = {
  employeeId: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export const createRecord = async (data: CreateRecordData) => {
  const response = await api.post('/records/new', data);
  return response.data;
};

export const activateAccount = async (data: ActivateAccountData) => {
  const response = await api.post('/records/activate', data);
  return response.data;
};
