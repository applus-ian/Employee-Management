import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useEmployeeSkills } from '@/hooks/records/use-fetch-employee-skills';
import { useCountryAssign } from '@/hooks/settings/job-position/country-assign/use-fetch-country-assigns';
import { useOfficeAssign } from '@/hooks/settings/job-position/office-assign/use-fetch-office-assigns';
import { useTeamAssign } from '@/hooks/settings/job-position/team-assign/use-fetch-team-assigns';
import { useDepartmentAssign } from '@/hooks/settings/job-position/department-assign/use-fetch-department-assigns';
import { useJobPositions } from '@/hooks/settings/employee/job-position/use-fetch-job-position';
import { Check, ChevronsUpDown, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Controller } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useEmploymentForm } from '@/hooks/records/use-employment-form';
import { useEmploymentStatus } from '@/hooks/records/use-employment-status';
import { EmploymentStatus } from '@/types/records/employment-status';
import { Record } from '@/types/records/record';

interface EditEmploymentInformationProps {
  record: Record;
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

  const { handleSubmit, errors, control, watch, setValue, isPending, success, onSubmit } = useEmploymentForm({
    record,
    employeeSkills: employee_skills,
    onClose,
  });

  const { showStatusChange, openStatus, setOpenStatus, toggleStatusChange, handleStatusSelect, availableStatuses } =
    useEmploymentStatus({
      currentStatus: record.employee.status as EmploymentStatus,
      onStatusChange: (status) => setValue('status_change.status', status),
    });

  const currentStatus = watch('status_change.status');
  const showRemarksError = currentStatus && !watch('status_change.remarks');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
      {/* Job Position Field */}
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

      {/* Country Field */}
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

      {/* Office Field */}
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

      {/* Team Field */}
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

      {/* Department Field */}
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

      {/* Status Change Section */}
      <div className="border-t pt-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Employment Status</h3>
            <p className="text-sm text-gray-500 mt-1">
              Current Status:
              <Badge
                className={cn(
                  'ml-2',
                  record.employee.status === 'active' && 'bg-green-100 text-green-800',
                  record.employee.status === 'onboarding' && 'bg-blue-100 text-blue-800',
                  record.employee.status === 'account creation' && 'bg-purple-100 text-purple-800',
                  record.employee.status === 'terminated' && 'bg-red-100 text-red-800',
                  record.employee.status === 'inactive' && 'bg-yellow-100 text-yellow-800',
                )}
              >
                {record.employee.status}
              </Badge>
            </p>
          </div>
          <Button type="button" variant="outline" onClick={toggleStatusChange} className="text-sm">
            {showStatusChange ? 'Cancel Status Change' : 'Change Status'}
          </Button>
        </div>

        {showStatusChange && (
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">New Status</Label>
              <Controller
                name="status_change.status"
                control={control}
                render={({ field }) => (
                  <Popover open={openStatus} onOpenChange={setOpenStatus}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openStatus}
                        className="w-full justify-between rounded-xl px-4 py-5 border border-gray-300 hover:border-orange-500"
                      >
                        {field.value ? (
                          <div className="flex items-center gap-2">
                            <Badge
                              className={cn(
                                field.value === 'active' && 'bg-green-100 text-green-800',
                                field.value === 'onboarding' && 'bg-blue-100 text-blue-800',
                                field.value === 'account creation' && 'bg-purple-100 text-purple-800',
                                field.value === 'terminated' && 'bg-red-100 text-red-800',
                                field.value === 'inactive' && 'bg-yellow-100 text-yellow-800',
                              )}
                            >
                              {field.value}
                            </Badge>
                          </div>
                        ) : (
                          'Select new status...'
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search status..." />
                        <CommandEmpty>No status found.</CommandEmpty>
                        <CommandGroup>
                          {availableStatuses.map((status) => (
                            <CommandItem key={status} value={status} onSelect={() => handleStatusSelect(status)}>
                              <Check
                                className={cn('mr-2 h-4 w-4', field.value === status ? 'opacity-100' : 'opacity-0')}
                              />
                              <Badge
                                className={cn(
                                  'mr-2',
                                  status === 'active' && 'bg-green-100 text-green-800',
                                  status === 'onboarding' && 'bg-blue-100 text-blue-800',
                                  status === 'account creation' && 'bg-purple-100 text-purple-800',
                                  status === 'terminated' && 'bg-red-100 text-red-800',
                                  status === 'inactive' && 'bg-yellow-100 text-yellow-800',
                                )}
                              >
                                {status}
                              </Badge>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.status_change?.status && (
                <span className="text-red-500 text-sm">{errors.status_change.status.message}</span>
              )}
            </div>

            {currentStatus && (
              <>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">Remarks</Label>
                  <Controller
                    name="status_change.remarks"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="Enter remarks for the status change..."
                        className="w-full rounded-xl border border-gray-300 hover:border-orange-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        rows={3}
                      />
                    )}
                  />
                  {showRemarksError && (
                    <span className="text-red-500 text-sm">Remarks are required for status changes</span>
                  )}
                </div>

                <Alert variant="warning" className="bg-yellow-50 border-yellow-200">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <p className="font-medium mb-1">Status Change Warning</p>
                    <p>
                      Changing the employment status from <strong>{record.employee.status}</strong> to{' '}
                      <strong>{currentStatus}</strong> will be recorded in the employee&apos;s history. This action
                      cannot be undone.
                    </p>
                  </AlertDescription>
                </Alert>
              </>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isPending}
          className="px-6 py-2 rounded-xl text-sm font-medium"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-2 rounded-xl text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
      {success && <div className="text-green-600">Employment information updated!</div>}
    </form>
  );
}
