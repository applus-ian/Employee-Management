'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogHeader, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useCreateOfficeAssign } from '@/hooks/settings/job-position/office-assign/use-create-office-assign';
import toast from 'react-hot-toast';

// Zod Schema
const officeAssignSchema = z.object({
  name: z.string().min(1, 'Office assign name is required'),
});

// Infer the form type
type OfficeAssignInput = z.infer<typeof officeAssignSchema>;

interface NewOfficeAssignFormProps {
  onCancel: () => void;
  onSave: (data: OfficeAssignInput) => void;
}

export default function NewOfficeAssignForm({ onCancel, onSave }: NewOfficeAssignFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OfficeAssignInput>({
    resolver: zodResolver(officeAssignSchema),
  });

  const { mutate: createOfficeAssign, isPending, isError, error } = useCreateOfficeAssign();

  const onSubmit = (data: OfficeAssignInput) => {
    createOfficeAssign(data, {
      onSuccess: () => {
        onSave(data);
        toast.success('Office assignment created successfully!');
        reset();
        onCancel();
      },
      onError: (error: { message: string }) => {
        toast.error('Error creating office assign!');
        console.error('Error creating office assign:', error.message);
      },
    });
  };

  return (
    <DialogContent className="w-full lg:!max-w-[45rem] h-fit flex flex-col bg-white">
      <DialogHeader>
        <DialogTitle>Create New Office Assign</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-5 py-3">
        <div>
          <Label htmlFor="name">
            <h3 className="text-black font-base">Office Assign Name</h3>
          </Label>
          <Input id="name" {...register('name')} placeholder="Enter office assign name..." className="mt-2" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {isError && (
          <div className="text-red-600">
            <p>Error creating office assign: {error?.message}</p>
          </div>
        )}

        <div className="flex justify-center gap-x-6 pt-3">
          <Button type="submit" className="bg-[#EE7A2A] text-white w-[10rem]" disabled={isPending}>
            {isPending ? 'Creating...' : 'Create'}
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </DialogClose>
        </div>
      </form>
    </DialogContent>
  );
}
