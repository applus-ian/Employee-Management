import { useState } from 'react';
import { EmploymentStatus } from '@/types/records/employment-status';

interface UseEmploymentStatusProps {
  currentStatus: EmploymentStatus;
  onStatusChange?: (status: EmploymentStatus) => void;
}

export function useEmploymentStatus({ currentStatus, onStatusChange }: UseEmploymentStatusProps) {
  const [showStatusChange, setShowStatusChange] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const toggleStatusChange = () => {
    setShowStatusChange(!showStatusChange);
  };

  const handleStatusSelect = (status: EmploymentStatus) => {
    onStatusChange?.(status);
    setOpenStatus(false);
  };

  const availableStatuses = (
    ['onboarding', 'account creation', 'active', 'terminated', 'inactive'] as EmploymentStatus[]
  ).filter((status) => status !== currentStatus);

  return {
    showStatusChange,
    openStatus,
    setOpenStatus,
    toggleStatusChange,
    handleStatusSelect,
    availableStatuses,
  };
}
