import { z } from 'zod';

export const updatePasswordSchema = z
  .object({
    current_password: z.string().min(6, 'Current password is required'),
    new_password: z.string().min(6, 'New password must be at least 6 characters'),
    new_password_confirmation: z.string(),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: 'Passwords do not match',
    path: ['new_password_confirmation'],
  });

export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
