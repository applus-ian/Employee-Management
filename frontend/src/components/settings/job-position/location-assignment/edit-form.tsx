'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { LocationAssignment, UpdateLocationAssignmentInput, updateLocationAssignmentSchema } from '@/schemas';
import { useCountryAssign } from '@/hooks/settings/job-position/country-assign/use-fetch-country-assigns';
import { useOfficeAssign } from '@/hooks/settings/job-position/office-assign/use-fetch-office-assigns';
import { useTeamAssign } from '@/hooks/settings/job-position/team-assign/use-fetch-team-assigns';
import { useDepartmentAssign } from '@/hooks/settings/job-position/department-assign/use-fetch-department-assigns';
import { useRecords } from '@/hooks/records/use-fetch-records';
import { DialogClose } from '@radix-ui/react-dialog';

interface EditLocationAssignmentFormProps {
  location_assignment: LocationAssignment;
  onCancel: () => void;
  onSave: (updatedData: UpdateLocationAssignmentInput) => Promise<void> | void;
}

export function EditLocationAssignmentForm({ location_assignment, onCancel, onSave }: EditLocationAssignmentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<UpdateLocationAssignmentInput>({
    resolver: zodResolver(updateLocationAssignmentSchema),
    defaultValues: {
      id: location_assignment.id,
      job_position_id: location_assignment.job_position?.id,
      country_assign_id: location_assignment.country_assign?.id,
      office_assign_id: location_assignment.office_assign?.id,
      team_assign_id: location_assignment.team_assign?.id,
      department_assign_id: location_assignment.department_assign?.id,
      employee_id: location_assignment.employee.id,
    },
  });

  // Reset form values when `location_assignment` changes
  useEffect(() => {
    reset({
      id: location_assignment.id,
      job_position_id: location_assignment.job_position?.id,
      country_assign_id: location_assignment.country_assign?.id,
      office_assign_id: location_assignment.office_assign?.id,
      team_assign_id: location_assignment.team_assign?.id,
      department_assign_id: location_assignment.department_assign?.id,
      employee_id: location_assignment.employee.id,
    });
  }, [location_assignment, reset]);

  const { data: countries = [], isLoading: countryLoading } = useCountryAssign();
  const { data: offices = [], isLoading: officeLoading } = useOfficeAssign();
  const { data: teams = [], isLoading: teamLoading } = useTeamAssign();
  const { data: departments = [], isLoading: deptLoading } = useDepartmentAssign();
  const { data, isLoading } = useRecords();

  const selectedEmployeeId = watch('employee_id');

  useEffect(() => {
    const selectedEmployee = data?.records.users.find((user) => user.employee.id === selectedEmployeeId);
    if (selectedEmployee) {
      setValue('job_position_id', selectedEmployee.employee.job_position.id);
    }
  }, [selectedEmployeeId, data?.records.users, setValue]);

  const onSubmit = async (formData: UpdateLocationAssignmentInput) => {
    console.log(formData);
    await onSave({
      ...formData,
    });
    reset(formData);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Employee */}
      <div>
        <Label htmlFor="employee_id" className="text-black">
          Employee
        </Label>
        <select
          id="employee_id"
          className="mt-2 w-full rounded-md border px-2 py-1 text-sm"
          {...register('employee_id')}
          disabled={isLoading}
        >
          <option value="">Select Employee</option>
          {data?.records.users.map((user) => (
            <option key={user.employee.id} value={user.employee.id.toString()}>
              {user.employee.first_name} {user.employee.last_name}
            </option>
          ))}
        </select>
        {errors.employee_id && <p className="text-sm text-red-500">{errors.employee_id.message}</p>}
      </div>

      {/* Job Title */}
      <div>
        <Label htmlFor="job_position_id" className="text-black">
          Job Title
        </Label>
        <input
          id="job_position_id"
          type="text"
          readOnly
          className="mt-2 w-full rounded-md border px-2 py-1 text-sm bg-gray-100 text-gray-700 cursor-not-allowed"
          value={
            data?.records.users.find((user) => user.employee.id === selectedEmployeeId)?.employee.job_position.title ||
            ''
          }
        />
        <input type="hidden" {...register('job_position_id')} />
      </div>

      {/* Country Assign */}
      <div>
        <Label htmlFor="country_assign_id" className="text-black">
          Country Assign
        </Label>
        <select
          id="country_assign_id"
          className="mt-2 w-full rounded-md border px-2 py-1 text-sm"
          {...register('country_assign_id')}
          disabled={countryLoading}
        >
          <option value="">Select Country Assign</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id.toString()}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country_assign_id && <p className="text-sm text-red-500">{errors.country_assign_id.message}</p>}
      </div>

      {/* Office Assign */}
      <div>
        <Label htmlFor="office_assign_id" className="text-black">
          Office Assign
        </Label>
        <select
          id="office_assign_id"
          className="mt-2 w-full rounded-md border px-2 py-1 text-sm"
          {...register('office_assign_id')}
          disabled={officeLoading}
        >
          <option value="">Select Office Assign</option>
          {offices.map((office) => (
            <option key={office.id} value={office.id.toString()}>
              {office.name}
            </option>
          ))}
        </select>
        {errors.office_assign_id && <p className="text-sm text-red-500">{errors.office_assign_id.message}</p>}
      </div>

      {/* Team Assign */}
      <div>
        <Label htmlFor="team_assign_id" className="text-black">
          Team Assign
        </Label>
        <select
          id="team_assign_id"
          className="mt-2 w-full rounded-md border px-2 py-1 text-sm"
          {...register('team_assign_id')}
          disabled={teamLoading}
        >
          <option value="">Select Team Assign</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id.toString()}>
              {team.name}
            </option>
          ))}
        </select>
        {errors.team_assign_id && <p className="text-sm text-red-500">{errors.team_assign_id.message}</p>}
      </div>

      {/* Department Assign */}
      <div>
        <Label htmlFor="department_assign_id" className="text-black">
          Department Assign
        </Label>
        <select
          id="department_assign_id"
          className="mt-2 w-full rounded-md border px-2 py-1 text-sm"
          {...register('department_assign_id')}
          disabled={deptLoading}
        >
          <option value="">Select Department Assign</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id.toString()}>
              {dept.name}
            </option>
          ))}
        </select>
        {errors.department_assign_id && <p className="text-sm text-red-500">{errors.department_assign_id.message}</p>}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-x-4 pt-2">
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" className="bg-[#EE7A2A] text-white" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
