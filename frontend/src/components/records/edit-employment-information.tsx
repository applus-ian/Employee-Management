import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useUpdateRecord } from '@/hooks/records/use-update-record';
import { useEmployeeSkills } from '@/hooks/records/use-fetch-employee-skills';
import { useState } from 'react';
import { employmentEditSchema, EmploymentEditInput } from '@/schemas/records/employmentEditSchema';
import { useCountryAssign } from '@/hooks/settings/job-position/country-assign/use-fetch-country-assigns';
import { useOfficeAssign } from '@/hooks/settings/job-position/office-assign/use-fetch-office-assigns';
import { useTeamAssign } from '@/hooks/settings/job-position/team-assign/use-fetch-team-assigns';
import { useDepartmentAssign } from '@/hooks/settings/job-position/department-assign/use-fetch-department-assigns';
import { useJobPositions } from '@/hooks/settings/employee/job-position/use-fetch-job-position';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Controller } from 'react-hook-form';

interface EditEmploymentInformationProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  record: any;
  onClose?: () => void;
}

export function EditEmploymentInformation({ record, onClose }: EditEmploymentInformationProps) {
  const { data: employee_skills = [] } = useEmployeeSkills(record.employee.id);
  const { data: jobPositions = [] } = useJobPositions();
  const { data: countries = [] } = useCountryAssign();
  const { data: offices = [] } = useOfficeAssign();
  const { data: teams = [] } = useTeamAssign();
  const { data: departments = [] } = useDepartmentAssign();

  const [openJobPosition, setOpenJobPosition] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [openOffice, setOpenOffice] = useState(false);
  const [openTeam, setOpenTeam] = useState(false);
  const [openDepartment, setOpenDepartment] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<EmploymentEditInput>({
    resolver: zodResolver(employmentEditSchema),
    defaultValues: {
      job_position_id: record.employee.job_position.id,
      country_id: record.employee.location_assignment.country_assign?.id,
      office_id: record.employee.location_assignment.office_assign?.id,
      team_id: record.employee.location_assignment.team_assign?.id,
      department_id: record.employee.location_assignment.department_assign?.id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      skills: employee_skills.map((s: any) => s.id),
    },
  });

  const { mutate, isPending } = useUpdateRecord();
  const [success, setSuccess] = useState(false);

  const onSubmit = (data: EmploymentEditInput) => {
    mutate(
      { id: record.employee.id, ...data },
      {
        onSuccess: () => {
          setSuccess(true); // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          onClose && onClose();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-1">Job Position</Label>
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
                  className="w-full justify-between rounded-xl px-4 py-5 border border-gray-300 hover:border-orange-500"
                >
                  {field.value
                    ? jobPositions.find((position) => position.id === field.value)?.title
                    : 'Select job position...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search job position..." />
                  <CommandEmpty>No job position found.</CommandEmpty>
                  <CommandGroup>
                    {jobPositions.map((position) => (
                      <CommandItem
                        key={position.id}
                        value={position.title}
                        onSelect={() => {
                          field.onChange(position.id);
                          setOpenJobPosition(false);
                        }}
                      >
                        <Check
                          className={cn('mr-2 h-4 w-4', field.value === position.id ? 'opacity-100' : 'opacity-0')}
                        />
                        {position.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.job_position_id && <span className="text-red-500 text-sm">{errors.job_position_id.message}</span>}
      </div>

      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-1">Country</Label>
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
                  className="w-full justify-between rounded-xl px-4 py-5 border border-gray-300 hover:border-orange-500"
                >
                  {field.value ? countries.find((country) => country.id === field.value)?.name : 'Select country...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search country..." />
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandGroup>
                    {countries.map((country) => (
                      <CommandItem
                        key={country.id}
                        value={country.name}
                        onSelect={() => {
                          field.onChange(country.id);
                          setOpenCountry(false);
                        }}
                      >
                        <Check
                          className={cn('mr-2 h-4 w-4', field.value === country.id ? 'opacity-100' : 'opacity-0')}
                        />
                        {country.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.country_id && <span className="text-red-500 text-sm">{errors.country_id.message}</span>}
      </div>

      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-1">Office</Label>
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
                  className="w-full justify-between rounded-xl px-4 py-5 border border-gray-300 hover:border-orange-500"
                >
                  {field.value ? offices.find((office) => office.id === field.value)?.name : 'Select office...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search office..." />
                  <CommandEmpty>No office found.</CommandEmpty>
                  <CommandGroup>
                    {offices.map((office) => (
                      <CommandItem
                        key={office.id}
                        value={office.name}
                        onSelect={() => {
                          field.onChange(office.id);
                          setOpenOffice(false);
                        }}
                      >
                        <Check
                          className={cn('mr-2 h-4 w-4', field.value === office.id ? 'opacity-100' : 'opacity-0')}
                        />
                        {office.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.office_id && <span className="text-red-500 text-sm">{errors.office_id.message}</span>}
      </div>

      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-1">Team</Label>
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
                  className="w-full justify-between rounded-xl px-4 py-5 border border-gray-300 hover:border-orange-500"
                >
                  {field.value ? teams.find((team) => team.id === field.value)?.name : 'Select team...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search team..." />
                  <CommandEmpty>No team found.</CommandEmpty>
                  <CommandGroup>
                    {teams.map((team) => (
                      <CommandItem
                        key={team.id}
                        value={team.name}
                        onSelect={() => {
                          field.onChange(team.id);
                          setOpenTeam(false);
                        }}
                      >
                        <Check className={cn('mr-2 h-4 w-4', field.value === team.id ? 'opacity-100' : 'opacity-0')} />
                        {team.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.team_id && <span className="text-red-500 text-sm">{errors.team_id.message}</span>}
      </div>

      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-1">Department</Label>
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
                  className="w-full justify-between rounded-xl px-4 py-5 border border-gray-300 hover:border-orange-500"
                >
                  {field.value
                    ? departments.find((department) => department.id === field.value)?.name
                    : 'Select department...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search department..." />
                  <CommandEmpty>No department found.</CommandEmpty>
                  <CommandGroup>
                    {departments.map((department) => (
                      <CommandItem
                        key={department.id}
                        value={department.name}
                        onSelect={() => {
                          field.onChange(department.id);
                          setOpenDepartment(false);
                        }}
                      >
                        <Check
                          className={cn('mr-2 h-4 w-4', field.value === department.id ? 'opacity-100' : 'opacity-0')}
                        />
                        {department.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.department_id && <span className="text-red-500 text-sm">{errors.department_id.message}</span>}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="bg-[#EE7A2A] text-white" disabled={isPending}>
          {isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
      {success && <div className="text-green-600">Employment information updated!</div>}
    </form>
  );
}
