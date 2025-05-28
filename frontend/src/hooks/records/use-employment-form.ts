import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employmentEditSchema, EmploymentEditInput } from '@/schemas/records/employmentEditSchema';
import { useUpdateRecord } from './use-update-record';
import { useState } from 'react';

interface UseEmploymentFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  record: any; // TODO: Replace with proper type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  employeeSkills: any[]; // TODO: Replace with proper type
  onClose?: () => void;
}

export function useEmploymentForm({ record, employeeSkills, onClose }: UseEmploymentFormProps) {
  const [success, setSuccess] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<EmploymentEditInput>({
    resolver: zodResolver(employmentEditSchema),
    defaultValues: {
      job_position_id: record.employee.job_position.id,
      country_id: record.employee.location_assignment.country_assign?.id,
      office_id: record.employee.location_assignment.office_assign?.id,
      team_id: record.employee.location_assignment.team_assign?.id,
      department_id: record.employee.location_assignment.department_assign?.id, // eslint-disable-next-line @typescript-eslint/no-explicit-any
      skills: employeeSkills.map((s: any) => s.id),
    },
  });

  const { mutate, isPending } = useUpdateRecord();

  const onSubmit = (data: EmploymentEditInput) => {
    mutate(
      { id: record.employee.id, ...data },
      {
        onSuccess: () => {
          setSuccess(true);
          onClose?.();
        },
      },
    );
  };

  return {
    handleSubmit,
    errors,
    control,
    watch,
    setValue,
    isPending,
    success,
    onSubmit,
  };
}
