'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useCreateSkill } from '@/hooks/settings/employee/skill/use-create-skill';
import { useSkillCategory } from '@/hooks/settings/employee/skill/skill-category/use-fetch-skill-categories';
import toast from 'react-hot-toast';

const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  description: z.string().nullable(),
  skill_category_id: z.number({ required_error: 'Please select a skill category' }),
});

type SkillInput = z.infer<typeof skillSchema>;

interface NewSkillFormProps {
  onCancel: () => void;
  onSave: (data: SkillInput) => void;
}

export default function NewSkillForm({ onCancel, onSave }: NewSkillFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillInput>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: '',
      description: '',
      skill_category_id: undefined as unknown as number, // satisfy TS
    },
  });

  const { data: categories = [], isLoading: catLoading } = useSkillCategory();
  const { mutate: createSkill, isPending, isError, error } = useCreateSkill();

  const onSubmit = (data: SkillInput) => {
    createSkill(data, {
      onSuccess: () => {
        toast.success('Skill created successfully!');
        onSave(data);
        reset();
        onCancel();
      },
    });
  };

  return (
    <DialogContent className="flex h-fit w-full flex-col bg-white lg:!max-w-[45rem]">
      <DialogHeader>
        <DialogTitle>Create New Skill</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-5 py-3">
        <div>
          <Label htmlFor="name" className="text-black">
            Skill Name
          </Label>
          <Input id="name" {...register('name')} placeholder="Enter skill name..." className="mt-2" />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="description" className="text-black">
            Description
          </Label>
          <textarea
            id="description"
            {...register('description')}
            placeholder="Enter description..."
            className="mt-2 h-[130px] w-full resize-none rounded-xl border px-3 py-2 text-sm hover:border-orange-400"
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
        </div>

        <div>
          <Label htmlFor="skill_category_id" className="text-black">
            Skill Category
          </Label>
          <select
            id="skill_category_id"
            className="mt-2 w-full rounded-md border px-2 py-1 text-sm"
            {...register('skill_category_id', { valueAsNumber: true })}
            disabled={catLoading}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.skill_category_id && <p className="text-sm text-red-500">{errors.skill_category_id.message}</p>}
        </div>

        {isError && (
          <div className="text-red-600">
            <p>Error creating skill: {error?.message}</p>
          </div>
        )}

        {/* Actions ---------------------------------------------------------*/}
        <div className="flex justify-center gap-x-6 pt-3">
          <Button type="submit" className="w-[10rem] bg-[#EE7A2A] text-white" disabled={isPending}>
            {isPending ? 'Creating...' : 'Create'}
          </Button>
          <Button
            type="button"
            className="w-[10rem] border-2 border-[#EE7A2A] bg-white text-[#EE7A2A]"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
