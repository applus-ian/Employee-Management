'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogHeader, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useCreateJobPosition } from '@/hooks/settings/job-position/job-position/use-create-job-position';
import toast from 'react-hot-toast';
import { useState } from 'react';

// Zod Schema
const jobPositionSchema = z.object({
  title: z.string().min(1, 'Job Position title is required'),
});

// Infer the form type
type JobPositionInput = z.infer<typeof jobPositionSchema>;

interface NewJobPositionFormProps {
  onCancel: () => void;
  onSave: (data: JobPositionInput) => void;
}

export default function NewJobPositionForm({ onCancel, onSave }: NewJobPositionFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobPositionInput>({
    resolver: zodResolver(jobPositionSchema),
  });

  const { mutate: createJobPosition, isPending } = useCreateJobPosition();
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string[] }>({});

  const onSubmit = (data: JobPositionInput) => {
    createJobPosition(data, {
      onSuccess: () => {
        onSave(data);
        toast.success('Job Position created succesfully!');
        reset();
        onCancel();
      },
      onError: (error) => {
        const response = (error as { response?: { data?: { errors?: Record<string, string[]> } } }).response;

        if (response?.data?.errors) {
          setValidationErrors(response.data.errors);
        } else {
          // toast.error('Error creating job position!');
          // console.error('Error creating job position:', error.response.data.errors.title[0]);
        }
      },
    });
  };

  return (
    <DialogContent className="w-full lg:!max-w-[45rem] h-fit flex flex-col bg-white">
      <DialogHeader>
        <DialogTitle>Create New Job Position</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-5 py-3">
        <div>
          <Label htmlFor="title">
            <h3 className="text-black font-base">Job Position Title</h3>
          </Label>
          <Input id="title" {...register('title')} placeholder="Enter job position title..." className="mt-2" />
        </div>
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

        {/* Laravel backend validation */}
        {validationErrors.title && <p className="text-red-500 text-sm">{validationErrors.title[0]}</p>}

        <div className="flex justify-center gap-x-6 pt-3">
          <Button type="submit" className="bg-[#EE7A2A] text-white w-[10rem]" disabled={isPending}>
            {isPending ? 'Creating...' : 'Create'}
          </Button>
          <DialogClose asChild>
            <Button className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]" onClick={onCancel}>
              Cancel
            </Button>
          </DialogClose>
        </div>
      </form>
    </DialogContent>
  );
}
