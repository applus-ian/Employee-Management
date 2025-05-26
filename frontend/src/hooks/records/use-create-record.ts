import { useMutation } from '@tanstack/react-query';
import { createRecord } from '@/utils/api/records/createRecord';

interface CreateRecordResponse {
  employeeId: string;
  message: string;
}

export const useCreateRecord = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<CreateRecordResponse, Error, any>({
    mutationFn: createRecord,
  });
};
