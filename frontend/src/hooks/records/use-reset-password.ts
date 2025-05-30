import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/utils/api/records/resetPassword';
import type { UpdatePasswordInput } from '@/schemas/profile/changePasswordSchema';

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: UpdatePasswordInput) => resetPassword(data),
  });
};
