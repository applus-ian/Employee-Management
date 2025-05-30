import { useMutation } from '@tanstack/react-query';
import { createRecord } from '@/utils/api/records/createRecord';
import { z } from 'zod';
import { createEmployeeSchema } from '@/schemas/records/createEmployee';

type CreateRecordData = z.infer<typeof createEmployeeSchema>;

interface CreateRecordResponse {
  employee_id: string;
  message: string;
}

export const useCreateRecord = () => {
  return useMutation<CreateRecordResponse, Error, CreateRecordData>({
    mutationFn: createRecord,
  });
};
