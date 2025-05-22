'use client';

import { ListFilter, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { useSkill } from '@/hooks/settings/employee/skill/use-fetch-skill';
import { useJobPositions } from '@/hooks/settings/employee/job-position/use-fetch-job-position';
import { useCountryAssign } from '@/hooks/settings/job-position/country-assign/use-fetch-country-assigns';
import { useOfficeAssign } from '@/hooks/settings/job-position/office-assign/use-fetch-office-assigns';
import { useTeamAssign } from '@/hooks/settings/job-position/team-assign/use-fetch-team-assigns';
import { useDepartmentAssign } from '@/hooks/settings/job-position/department-assign/use-fetch-department-assigns';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

export type FilterValues = {
  job_position_id?: string;
  country_id?: string;
  office_id?: string;
  team_id?: string;
  department_id?: string;
  skills?: number[];
  experience?: number;
  status?: string;
};

const statuses = ['Active', 'Inactive', 'On Leave', 'Onboarding', 'Account Creation'];

export default function AdvancedFilterModal({ onApplyFilter }: { onApplyFilter: (filters: FilterValues) => void }) {
  const { register, handleSubmit, reset, control } = useForm<FilterValues>();
  const [experience, setExperience] = useState([0]);
  const [openJobPosition, setOpenJobPosition] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [openOffice, setOpenOffice] = useState(false);
  const [openTeam, setOpenTeam] = useState(false);
  const [openDepartment, setOpenDepartment] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

  const { data: skills = [] } = useSkill();
  const { data: jobPositions = [] } = useJobPositions();
  const { data: countries = [] } = useCountryAssign();
  const { data: offices = [] } = useOfficeAssign();
  const { data: teams = [] } = useTeamAssign();
  const { data: departments = [] } = useDepartmentAssign();

  const onSubmit = (data: FilterValues) => {
    const transformed: FilterValues = {
      ...data,
      skills: selectedSkills,
      experience: experience[0],
    };
    onApplyFilter(transformed);
    reset();
    setExperience([0]);
    setSelectedSkills([]);
  };

  const toggleSkill = (skillId: number) => {
    setSelectedSkills((prev) => (prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white border hover:bg-orange-50 hover:border-orange-500">
          <ListFilter className="mr-2 h-4 w-4" /> Advanced Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full lg:max-w-[40rem] max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Advanced Employee Filter</DialogTitle>
        </DialogHeader>
        <form id="advancedFilterForm" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Employment Filters */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Employment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Job Position */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Job Position</Label>
                <Controller
                  name="job_position_id"
                  control={control}
                  render={({ field }) => (
                    <Popover open={openJobPosition} onOpenChange={setOpenJobPosition}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openJobPosition}
                          className="w-full justify-between rounded-xl px-4 py-5 border border-gray-300 hover:border-orange-500 bg-white"
                        >
                          {field.value
                            ? jobPositions.find((position) => position.id.toString() === field.value)?.title
                            : 'Select job position...'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0 bg-white border border-gray-200 shadow-lg rounded-lg">
                        <Command>
                          <CommandInput placeholder="Search job position..." className="h-9" />
                          <CommandEmpty>No job position found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-[200px]">
                              {jobPositions.map((position) => (
                                <CommandItem
                                  key={position.id}
                                  value={position.title}
                                  onSelect={() => {
                                    field.onChange(position.id.toString());
                                    setOpenJobPosition(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      field.value === position.id.toString() ? 'opacity-100' : 'opacity-0',
                                    )}
                                  />
                                  {position.title}
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Location Assignment */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Location Assignment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Country */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Country</Label>
                <Controller
                  name="country_id"
                  control={control}
                  render={({ field }) => (
                    <Popover open={openCountry} onOpenChange={setOpenCountry}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCountry}
                          className="w-full justify-between rounded-xl px-4 py-5 border border-gray-300 hover:border-orange-500 bg-white"
                        >
                          {field.value
                            ? countries.find((country) => country.id.toString() === field.value)?.name
                            : 'Select country...'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0 bg-white border border-gray-200 shadow-lg rounded-lg">
                        <Command>
                          <CommandInput placeholder="Search country..." className="h-9" />
                          <CommandEmpty>No country found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-[200px]">
                              {countries.map((country) => (
                                <CommandItem
                                  key={country.id}
                                  value={country.name}
                                  onSelect={() => {
                                    field.onChange(country.id.toString());
                                    setOpenCountry(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      field.value === country.id.toString() ? 'opacity-100' : 'opacity-0',
                                    )}
                                  />
                                  {country.name}
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>

              {/* Office */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Office</Label>
                <Controller
                  name="office_id"
                  control={control}
                  render={({ field }) => (
                    <Popover open={openOffice} onOpenChange={setOpenOffice}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openOffice}
                          className="w-full justify-between rounded-xl px-4 py-5 border border-gray-300 hover:border-orange-500 bg-white"
                        >
                          {field.value
                            ? offices.find((office) => office.id.toString() === field.value)?.name
                            : 'Select office...'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0 bg-white border border-gray-200 shadow-lg rounded-lg">
                        <Command>
                          <CommandInput placeholder="Search office..." className="h-9" />
                          <CommandEmpty>No office found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-[200px]">
                              {offices.map((office) => (
                                <CommandItem
                                  key={office.id}
                                  value={office.name}
                                  onSelect={() => {
                                    field.onChange(office.id.toString());
                                    setOpenOffice(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      field.value === office.id.toString() ? 'opacity-100' : 'opacity-0',
                                    )}
                                  />
                                  {office.name}
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>

              {/* Team */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Team</Label>
                <Controller
                  name="team_id"
                  control={control}
                  render={({ field }) => (
                    <Popover open={openTeam} onOpenChange={setOpenTeam}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openTeam}
                          className="w-full justify-between rounded-xl px-4 py-5 border border-gray-300 hover:border-orange-500 bg-white"
                        >
                          {field.value
                            ? teams.find((team) => team.id.toString() === field.value)?.name
                            : 'Select team...'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0 bg-white border border-gray-200 shadow-lg rounded-lg">
                        <Command>
                          <CommandInput placeholder="Search team..." className="h-9" />
                          <CommandEmpty>No team found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-[200px]">
                              {teams.map((team) => (
                                <CommandItem
                                  key={team.id}
                                  value={team.name}
                                  onSelect={() => {
                                    field.onChange(team.id.toString());
                                    setOpenTeam(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      field.value === team.id.toString() ? 'opacity-100' : 'opacity-0',
                                    )}
                                  />
                                  {team.name}
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>

              {/* Department */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Department</Label>
                <Controller
                  name="department_id"
                  control={control}
                  render={({ field }) => (
                    <Popover open={openDepartment} onOpenChange={setOpenDepartment}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openDepartment}
                          className="w-full justify-between rounded-xl px-4 py-5 border border-gray-300 hover:border-orange-500 bg-white"
                        >
                          {field.value
                            ? departments.find((dept) => dept.id.toString() === field.value)?.name
                            : 'Select department...'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0 bg-white border border-gray-200 shadow-lg rounded-lg">
                        <Command>
                          <CommandInput placeholder="Search department..." className="h-9" />
                          <CommandEmpty>No department found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-[200px]">
                              {departments.map((dept) => (
                                <CommandItem
                                  key={dept.id}
                                  value={dept.name}
                                  onSelect={() => {
                                    field.onChange(dept.id.toString());
                                    setOpenDepartment(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      field.value === dept.id.toString() ? 'opacity-100' : 'opacity-0',
                                    )}
                                  />
                                  {dept.name}
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Skills & Experience */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Skills & Experience</h3>
            <div className="space-y-6">
              {/* Skills */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Skills</Label>
                <div className="flex flex-wrap gap-2 p-4 border rounded-xl min-h-[60px] bg-white">
                  {skills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant={selectedSkills.includes(skill.id) ? 'default' : 'outline'}
                      className={cn(
                        'cursor-pointer transition-colors px-3 py-1',
                        selectedSkills.includes(skill.id)
                          ? 'bg-orange-500 hover:bg-orange-600'
                          : 'hover:bg-orange-50 hover:border-orange-500',
                      )}
                      onClick={() => toggleSkill(skill.id)}
                    >
                      {skill.name}
                      {selectedSkills.includes(skill.id) && <X className="ml-1 h-3 w-3" />}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Years of Experience */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium text-gray-700">Years of Experience</Label>
                  <span className="text-sm font-medium text-orange-600">{experience[0]} years</span>
                </div>
                <div className="px-2 py-4 bg-gray-50 rounded-xl">
                  <div className="relative">
                    <div
                      className="absolute h-2 bg-orange-500 rounded-full transition-all duration-200"
                      style={{ width: `${(experience[0] / 20) * 100}%` }}
                    />
                    <Slider
                      value={experience}
                      onValueChange={setExperience}
                      max={20}
                      step={1}
                      className="relative [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-orange-500 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:shadow-lg [&_[role=track]]:h-2 [&_[role=track]]:bg-gray-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Employee Status</h3>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Status</Label>
              <select
                {...register('status')}
                className="w-full rounded-xl px-4 py-5 border border-gray-300 hover:border-orange-500 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select status...</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  reset();
                  setExperience([0]);
                  setSelectedSkills([]);
                }}
                className="hover:bg-orange-50 hover:text-orange-600"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" form="advancedFilterForm" className="bg-[#EE7A2A] text-white hover:bg-orange-600">
              Apply Filters
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
