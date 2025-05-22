import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActivateAccount } from '@/hooks/records/use-activate-account';
import { toast } from 'sonner';

const activateAccountSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });

type ActivateAccountFormData = z.infer<typeof activateAccountSchema>;

interface ActivateAccountFormProps {
  employeeId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const ActivateAccountForm = ({ employeeId, onSuccess, onCancel }: ActivateAccountFormProps) => {
  const { mutate: activateAccount, isPending } = useActivateAccount();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivateAccountFormData>({
    resolver: zodResolver(activateAccountSchema),
  });

  const onSubmit = async (data: ActivateAccountFormData) => {
    try {
      await activateAccount({
        employeeId,
        ...data,
      });
      toast.success('Account activated successfully');
      onSuccess();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to activate account');
    }
  };

  return (
    <div className="p-6 rounded-xl mb-6 pb-6">
      <h1 className="text-2xl font-semibold mb-8">Activate Employee Account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
        <div>
          <Label className="block text-sm text-gray-700 mb-1">Email Address</Label>
          <Input
            {...register('email')}
            type="email"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <Label className="block text-sm text-gray-700 mb-1">Password</Label>
          <Input
            {...register('password')}
            type="password"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <Label className="block text-sm text-gray-700 mb-1">Confirm Password</Label>
          <Input
            {...register('passwordConfirmation')}
            type="password"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
          {errors.passwordConfirmation && (
            <p className="text-red-500 text-xs mt-1">{errors.passwordConfirmation.message}</p>
          )}
        </div>

        <div className="flex gap-2 mt-6">
          <button
            type="submit"
            disabled={isPending}
            className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 text-sm disabled:opacity-50"
          >
            {isPending ? 'Activating...' : 'Activate Account'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
