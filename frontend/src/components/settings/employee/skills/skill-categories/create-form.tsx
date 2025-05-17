'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useCreateSkillCategory } from '@/hooks/settings/employee/skill/skill-category/use-create-skill-category';

// Zod Schema
const skillCategorySchema = z.object({
  name: z.string().min(1, 'Skill Category name is required'),
});

// Infer the form type
type SkillCategoryInput = z.infer<typeof skillCategorySchema>;

interface NewSkillCategoryFormProps {
  onCancel: () => void;
  onSave: (data: SkillCategoryInput) => void;
}

export default function NewSkillCategoryForm({ onCancel, onSave }: NewSkillCategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillCategoryInput>({
    resolver: zodResolver(skillCategorySchema),
  });

  const { mutate: createSkillCategory, isPending, isError, error } = useCreateSkillCategory();

  const onSubmit = (data: SkillCategoryInput) => {
    createSkillCategory(data, {
      onSuccess: () => {
        onSave(data);
        reset(); // Reset form
        onCancel(); // Close dialog
      },
      onError: (error: { message: string }) => {
        console.error('Error creating skill category:', error.message);
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-5 py-3">
        <div>
          <Label htmlFor="name">
            <h3 className="text-black font-base">Skill Category Name</h3>
          </Label>
          <Input id="name" {...register('name')} placeholder="Enter skill category name..." className="mt-2" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {isError && (
          <div className="text-red-600">
            <p>Error creating skill category: {error?.message}</p>
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
    </>
  );
}
