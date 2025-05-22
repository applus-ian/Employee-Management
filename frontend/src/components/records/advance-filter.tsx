'use client';

import { ListFilter } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const departments = ['Engineering', 'Marketing', 'HR', 'Sales'];
const skills = ['Python', 'React', 'Laravel', 'AWS', 'Docker'];
const certifications = ['AWS', 'Azure', 'GCP', 'Scrum Master'];
const statuses = ['Active', 'Inactive', 'On Leave'];

export type FilterValues = {
  department?: string | string[];
  skills?: string[];
  certifications?: string[];
  experience?: number;
  project?: string;
  status?: string;
};

export default function AdvancedFilterModal({ onApplyFilter }: { onApplyFilter: (filters: FilterValues) => void }) {
  const { register, handleSubmit, reset } = useForm();
  const [experience, setExperience] = useState([10]);
  const onSubmit = (data: FilterValues) => {
    console.log('Submitting form data:', data);
    const transformed: FilterValues = {
      ...(data.department ? { department: data.department } : {}),
      skills: Array.isArray(data.skills) ? data.skills : data.skills ? [data.skills] : [],
      certifications: Array.isArray(data.certifications)
        ? data.certifications
        : data.certifications
          ? [data.certifications]
          : [],
      experience: experience[0],
      ...(data.project ? { project: data.project } : {}),
      ...(data.status ? { status: data.status } : {}),
    };
    onApplyFilter(transformed);
    reset();
    setExperience([10]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white border">
          <ListFilter className="mr-2 h-4 w-4" /> Advanced Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full lg:max-w-[40rem] max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>Advanced Employee Filter</DialogTitle>
        </DialogHeader>
        <form id="advancedFilterForm" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Department */}
          <div>
            <Label htmlFor="department">Department</Label>
            <select id="department" {...register('department')} className="w-full border p-2 rounded-md">
              <option value="">-- Select Department --</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Skills */}
          <div>
            <Label>Skills</Label>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill) => (
                <label key={skill} className="flex items-center gap-2">
                  <input type="checkbox" value={skill} {...register('skills')} />
                  {skill}
                </label>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <Label>Certifications</Label>
            <div className="grid grid-cols-2 gap-2">
              {certifications.map((cert) => (
                <label key={cert} className="flex items-center gap-2">
                  <input type="checkbox" value={cert} {...register('certifications')} />
                  {cert}
                </label>
              ))}
            </div>
          </div>

          {/* Years of Experience */}
          <div>
            <Label htmlFor="experience">Years of Experience</Label>
            <Slider value={experience} onValueChange={setExperience} max={20} step={1} className="p-6 bg-orange" />
          </div>

          {/* Current Projects */}
          <div>
            <Label htmlFor="status">Projects</Label>
            <select id="project" {...register('project')} className="w-full border p-2 rounded-md">
              <option value="">-- Select Project --</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status">Status</Label>
            <select id="status" {...register('status')} className="w-full border p-2 rounded-md">
              <option value="">-- Select Status --</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <DialogClose asChild>
              <Button type="button" variant="ghost" onClick={() => reset()}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" form="advancedFilterForm">
              Apply Filters
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
