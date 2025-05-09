import { useMutation } from '@tanstack/react-query';
import { updatePassword } from '@/utils/api/profile/changePassword';
import type { UpdatePasswordInput } from '@/schemas/profile/changePasswordSchema';

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (data: UpdatePasswordInput) => updatePassword(data),
  });
};
