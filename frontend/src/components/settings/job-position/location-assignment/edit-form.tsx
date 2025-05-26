'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { LocationAssignment, UpdateLocationAssignment, updateLocationAssignmentInput } from '@/schemas';
import { useCountryAssign } from '@/hooks/settings/job-position/country-assign/use-fetch-country-assigns';
import { useOfficeAssign } from '@/hooks/settings/job-position/office-assign/use-fetch-office-assigns';
import { useTeamAssign } from '@/hooks/settings/job-position/team-assign/use-fetch-team-assigns';
import { useDepartmentAssign } from '@/hooks/settings/job-position/department-assign/use-fetch-department-assigns';
import { useRecords } from '@/hooks/records/use-fetch-records';
import toast from 'react-hot-toast';
import { DialogClose } from '@radix-ui/react-dialog';

interface EditLocationAssignmentFormProps {
  location_assignment: LocationAssignment;
  onCancel: () => void;
  onSave: (updatedDepartmentAssign: UpdateLocationAssignment) => Promise<void> | void;
}

export function EditLocationAssignmentForm({ location_assignment, onCancel, onSave }: EditLocationAssignmentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateLocationAssignment>({
    resolver: zodResolver(updateLocationAssignmentInput),
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

  const { data: countries = [], isLoading: countryLoading } = useCountryAssign();
  const { data: offices = [], isLoading: officeLoading } = useOfficeAssign();
  const { data: teams = [], isLoading: teamLoading } = useTeamAssign();
  const { data: departments = [], isLoading: deptLoading } = useDepartmentAssign();
  const { data, isLoading } = useRecords();

  const onSubmit = async (data: UpdateLocationAssignment) => {
    await onSave({
      ...location_assignment,
      job_position_id: data.job_position_id,
      country_assign_id: data.country_assign_id,
      office_assign_id: data.office_assign_id,
      team_assign_id: data.team_assign_id,
      department_assign_id: data.department_assign_id,
      employee_id: data.employee_id,
    });
    toast.success('Location assignment updated successfully!');
    reset(data);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            <option key={user.employee.id} value={user.employee.id}>
              {user.employee.first_name} {user.employee.last_name} - {user.employee.job_position.title}
            </option>
          ))}
        </select>
        {errors.employee_id && <p className="text-sm text-red-500">{errors.employee_id.message}</p>}
      </div>

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
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country_assign_id && <p className="text-sm text-red-500">{errors.country_assign_id.message}</p>}
      </div>

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
            <option key={office.id} value={office.id}>
              {office.name}
            </option>
          ))}
        </select>
        {errors.office_assign_id && <p className="text-sm text-red-500">{errors.office_assign_id.message}</p>}
      </div>

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
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        {errors.team_assign_id && <p className="text-sm text-red-500">{errors.team_assign_id.message}</p>}
      </div>

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
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
        {errors.department_assign_id && <p className="text-sm text-red-500">{errors.department_assign_id.message}</p>}
      </div>

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
