'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useCreateCountryAssign } from '@/hooks/settings/job-position/country-assign/use-create-country-assign';
import toast from 'react-hot-toast';

// Zod Schema
const countryAssignSchema = z.object({
  name: z.string().min(1, 'Country assign name is required'),
});

// Infer the form type
type CountryAssignInput = z.infer<typeof countryAssignSchema>;

interface NewCountryAssignFormProps {
  onCancel: () => void;
  onSave: (data: CountryAssignInput) => void;
}

export default function NewCountryAssignForm({ onCancel, onSave }: NewCountryAssignFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CountryAssignInput>({
    resolver: zodResolver(countryAssignSchema),
  });

  const { mutate: createCountryAssign, isPending, isError, error } = useCreateCountryAssign();

  const onSubmit = (data: CountryAssignInput) => {
    createCountryAssign(data, {
      onSuccess: () => {
        toast.success('Country Assignment Created!');
        onSave(data);
        reset(); // Reset form
        onCancel(); // Close dialog
      },
      onError: (error: { message: string }) => {
        toast.error('Error creating country assign!');
        console.error('Error creating country assign:', error.message);
      },
    });
  };

  return (
    <DialogContent className="w-full lg:!max-w-[45rem] h-fit flex flex-col bg-white">
      <DialogHeader>
        <DialogTitle>Create New Country Assign</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-5 py-3">
        <div>
          <Label htmlFor="name">
            <h3 className="text-black font-base">Country Assign Name</h3>
          </Label>
          <Input id="name" {...register('name')} placeholder="Enter country assign name..." className="mt-2" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {isError && (
          <div className="text-red-600">
            <p>Error creating country assign: {error?.message}</p>
          </div>
        )}

        <div className="flex justify-center gap-x-6 pt-3">
          <Button type="submit" className="bg-[#EE7A2A] text-white w-[10rem]" disabled={isPending}>
            {isPending ? 'Creating...' : 'Create'}
          </Button>
          <Button
            type="button"
            className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
