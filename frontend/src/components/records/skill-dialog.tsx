import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSkill } from '@/hooks/settings/employee/skill/use-fetch-skill';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface TemporarySkill {
  id: string;
  skill_id: number;
  name: string;
  description: string;
  years_of_experience: string;
}

const skillSchema = z.object({
  skill_id: z.coerce.number().min(1, 'Skill is required'),
  years_of_experience: z.string().min(1, 'Years of experience is required'),
});

type SkillFormData = z.infer<typeof skillSchema>;

interface SkillDialogProps {
  onSkillAdd: (skill: TemporarySkill) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialSkill?: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SkillDialog = ({ onSkillAdd, initialSkill, open, onOpenChange }: SkillDialogProps) => {
  const { data: skills = [] } = useSkill();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: initialSkill
      ? {
          skill_id: initialSkill.skill.id,
          years_of_experience: initialSkill.years_of_experience.toString(),
        }
      : undefined,
  });

  const onSubmit = (data: SkillFormData) => {
    const selectedSkill = skills.find((skill) => skill.id === data.skill_id);
    if (selectedSkill) {
      onSkillAdd({
        id: initialSkill?.id || Math.random().toString(),
        skill_id: data.skill_id,
        name: selectedSkill.name,
        description: selectedSkill.description || '',
        years_of_experience: data.years_of_experience,
      });
      reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialSkill ? 'Update Skill' : 'Add Skill'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Skill</Label>
            <Controller
              name="skill_id"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value ? String(field.value) : ''}
                  onValueChange={(val) => field.onChange(Number(val))}
                >
                  <SelectTrigger className="w-full rounded-xl px-4 py-3 border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm bg-white">
                    <SelectValue placeholder="Select skill..." />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-lg rounded-lg border border-gray-200 max-h-[300px] overflow-y-auto">
                    {skills.map((skill) => (
                      <SelectItem key={skill.id} value={String(skill.id)}>
                        {skill.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.skill_id && <p className="text-sm text-red-500">{errors.skill_id.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Years of Experience</Label>
            <Controller
              name="years_of_experience"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="Enter years of experience"
                  className="rounded-xl px-4 py-5 border border-gray-300 hover:border-orange-500"
                />
              )}
            />
            {errors.years_of_experience && <p className="text-sm text-red-500">{errors.years_of_experience.message}</p>}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button type="submit" className="bg-[#EE7A2A] text-white rounded-xl hover:bg-orange-600">
              {initialSkill ? 'Update' : 'Add'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
