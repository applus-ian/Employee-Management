import { api } from '@/utils/api/apiInstance';
import { UpdateGovBankNumberInput } from '@/schemas/profile/govBankNumberSchema';

export const updateGovBankNumbers = async (data: UpdateGovBankNumberInput) => {
  const response = await api.patch('/employees/update-gov-bank-numbers', data);
  return response.data;
};
