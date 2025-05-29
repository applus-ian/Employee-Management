import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActivateAccount } from '@/hooks/records/use-activate-account';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const { mutate: activateAccount, isPending } = useActivateAccount();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivateAccountFormData>({
    resolver: zodResolver(activateAccountSchema),
  });

  const activateLater = () => {
    onCancel();
    router.push('/records');
  };

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
    <div className="max-w-lg mx-auto bg-white rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-2 text-orange-600 flex items-center justify-center gap-2">
        <span className="bg-orange-100 text-orange-500 rounded-full p-2 mr-2">🔑</span>
        Activate Employee Account
      </h2>
      <p className="text-center text-gray-500 mb-6 text-sm">
        Set up the employee&apos;s login credentials. You can activate the account now or choose to activate it later.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">Email Address</Label>
          <Input
            {...register('email')}
            type="email"
            placeholder="Enter employee's email address"
            className="border border-gray-300 rounded-xl px-4 py-3 text-sm w-full hover:border-orange-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Password</Label>
            <Input
              {...register('password')}
              type="password"
              placeholder="Enter password"
              className="border border-gray-300 rounded-xl px-4 py-3 text-sm w-full hover:border-orange-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</Label>
            <Input
              {...register('passwordConfirmation')}
              type="password"
              placeholder="Re-enter password"
              className="border border-gray-300 rounded-xl px-4 py-3 text-sm w-full hover:border-orange-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
            {errors.passwordConfirmation && (
              <p className="text-red-500 text-xs mt-1">{errors.passwordConfirmation.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 mt-8 justify-center">
          <button
            type="submit"
            disabled={isPending}
            className="bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 text-base font-semibold disabled:opacity-50 shadow-sm"
          >
            {isPending ? 'Activating...' : 'Activate Account'}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              activateLater();
            }}
            className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-100 text-base font-semibold shadow-sm"
          >
            Activate Later
          </button>
        </div>
      </form>
    </div>
  );
};
