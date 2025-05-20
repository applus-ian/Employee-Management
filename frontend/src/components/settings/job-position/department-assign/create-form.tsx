'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose, DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateDepartmentAssign } from '@/hooks/settings/job-position/department-assign/use-create-department-assign';
import { useFetchDepartmentAssign } from '@/hooks/settings/job-position/department-assign/use-fetch-department-assigns';

const departmentAssignSchema = z.object({
  name: z.string().min(1, 'Team name is required'),
  parent_id: z.number().nullable(),
  parent_name: z.string().optional(),
});

type DepartmentAssignInput = z.infer<typeof departmentAssignSchema>;

interface NewDepartmentAssignFormProps {
  onCancel: () => void;
  onSave: (data: DepartmentAssignInput) => void;
}

export default function NewDepartmentAssignForm({ onCancel, onSave }: NewDepartmentAssignFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DepartmentAssignInput>({
    resolver: zodResolver(departmentAssignSchema),
  });

  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);

  const { mutate: createDepartmentAssign, isPending, isError, error } = useCreateDepartmentAssign();

  const { data: parentOptions = [], isLoading: isLoadingDepartments } = useFetchDepartmentAssign();

  const onSubmit = (data: DepartmentAssignInput) => {
    // const parent = parentOptions.find((p) => p.id === selectedParentId);

    const payload = {
      name: data.name,
      parent_id: selectedParentId,
    };

    console.log('Payload:', payload); // helpful debug

    createDepartmentAssign(payload, {
      onSuccess: () => {
        onSave(payload);
        reset();
        setSelectedParentId(null);
        onCancel();
      },
      // onError: (/* error: any */) => {
      //   console.error('Error creating department assignment:', error.response?.data || error.message);
      // },
    });
  };

  return (
    <DialogContent className="w-full lg:!max-w-[35rem] h-fit flex flex-col bg-white">
      <DialogHeader>
        <DialogTitle>Create New Department Assignment</DialogTitle>
      </DialogHeader>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid">
            {/* Department Name */}
            <div className="flex flex-col p-5">
              <Label>
                <h3 className="text-black font-base">Department Name</h3>
              </Label>
              <Input id="name" {...register('name')} placeholder="Enter team name..." className="mt-2" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Parent Department Dropdown */}
            <div className="flex flex-col p-5 pt-2">
              <Label>
                <h3 className="text-black font-base">Parent Department</h3>
              </Label>
              {isLoadingDepartments ? (
                <p className="text-gray-500 mt-2">Loading departments...</p>
              ) : (
                <Select
                  onValueChange={(value) => {
                    if (value === '- ') {
                      setSelectedParentId(null);
                      setValue('parent_id', null);
                      return;
                    }

                    const selected = parentOptions.find((p) => p.name === value);
                    setSelectedParentId(selected?.id ?? null);
                    setValue('parent_id', selected?.id ?? null);
                    setValue('parent_name', selected?.name ?? '');
                  }}
                >
                  <SelectTrigger className="mt-2 px-4 py-2 pl-3 w-full border rounded-xl border-gray-500 focus:border-[#EE7A2A]">
                    <SelectValue placeholder="Choose parent department" className="text-gray-500" />
                  </SelectTrigger>
                  <SelectContent className="border rounded-xl border-gray-500 bg-white">
                    <SelectItem value="none" className="hover:bg-gray-300 text-black">
                      No Parent
                    </SelectItem>
                    {/* {parentOptions.map((option) => (
                      <SelectItem
                        key={option.id}
                        value={option.id}
                        className="hover:bg-gray-300 text-black"
                      >
                        {option.name}
                      </SelectItem>
                    ))} */}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Error Display */}
            {isError && (
              <div className="text-red-600 px-5">
                <p>Error creating Department Assignment: {error?.message}</p>
              </div>
            )}

            {/* Form Actions */}
            <div className="px-5 pt-5 flex justify-center gap-x-6">
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
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
