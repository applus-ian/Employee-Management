'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skill } from '@/schemas';
import { useSkillCategory } from '@/hooks/settings/employee/skill/skill-category/use-fetch-skill-categories';

const editSkillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  description: z.string().nullable().optional(),
  skill_category_id: z.number({ required_error: 'Please select a skill category' }),
});

type EditSkillInput = z.infer<typeof editSkillSchema>;

interface EditSkillFormProps {
  skill: Skill;
  onCancel: () => void;
  onSave: (updatedSkill: Skill) => Promise<void> | void;
}

export function EditSkillForm({ skill, onCancel, onSave }: EditSkillFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditSkillInput>({
    resolver: zodResolver(editSkillSchema),
    defaultValues: {
      name: skill.name,
      description: skill.description ?? '',
      skill_category_id: skill.skill_category.id,
    },
  });

  const { data: categories = [], isLoading: catLoading } = useSkillCategory();

  const onSubmit = async (data: EditSkillInput) => {
    await onSave({
      ...skill,
      name: data.name,
      description: data.description ?? null,
      skill_category: {
        id: data.skill_category_id,
        name: categories.find((c) => c.id === data.skill_category_id)?.name ?? '',
      },
    });
    reset(data);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label htmlFor="name">Skill Name</Label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          {...register('description')}
          className="mt-2 h-[130px] w-full resize-none rounded-xl border px-3 py-2 text-sm hover:border-orange-400"
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <div>
        <Label htmlFor="skill_category_id">Skill Category</Label>
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

      <div className="flex justify-end gap-x-4 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" className="bg-[#EE7A2A] text-white" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
