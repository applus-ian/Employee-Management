import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSkill } from '@/hooks/settings/employee/skill/use-fetch-skill';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export interface TemporarySkill {
  id: string;
  skill_id: number;
  name: string;
  description: string;
  years_of_experience: string;
}

const skillSchema = z.object({
  skill_id: z.number().min(1, 'Skill is required'),
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
  const [openCombobox, setOpenCombobox] = React.useState(false);
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
                <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCombobox}
                      className="w-full justify-between rounded-xl px-4 py-5 border border-gray-300 hover:border-orange-500"
                    >
                      {field.value ? skills.find((skill) => skill.id === field.value)?.name : 'Select skill...'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search skill..." className="h-9" />
                      <CommandEmpty>No skill found.</CommandEmpty>
                      <CommandGroup>
                        {skills.map((skill) => (
                          <CommandItem
                            key={skill.id}
                            value={skill.name}
                            onSelect={() => {
                              field.onChange(skill.id);
                              setOpenCombobox(false);
                            }}
                          >
                            <Check
                              className={cn('mr-2 h-4 w-4', field.value === skill.id ? 'opacity-100' : 'opacity-0')}
                            />
                            {skill.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
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
