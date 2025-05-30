'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Ban, EllipsisVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { RecordCol } from '@/schemas';
import { useDeleteRecord } from '@/hooks/records/use-delete-record';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import UpdateStatusDialog from './update-status-dialog';
import { useEmployeeCurrentStatus } from '@/hooks/records/use-employee-current-status';
import { ActivateAccountForm } from './activate-account-form';

const getStatusColor = (status?: string | null) => {
  if (!status) return 'bg-gray-100 text-gray-700';
  switch (status.toLowerCase()) {
    case 'onboarding':
      return 'bg-blue-100 text-blue-700';
    case 'account creation':
      return 'bg-purple-100 text-purple-700';
    case 'active':
      return 'bg-green-100 text-green-700';
    case 'terminated':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const columns: ColumnDef<RecordCol>[] = [
  {
    accessorKey: 'employee_id',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Employee ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    meta: {
      label: 'Employee ID',
    },
  },
  {
    accessorKey: 'profile',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Profile
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const url = row.original.profile;
      return <img src={url} alt="Profile" className="w-10 h-10 rounded-full object-cover" />;
    },
    meta: {
      label: 'Profile',
    },
  },
  {
    accessorKey: 'full_name',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Full Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    meta: {
      label: 'Full Name',
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Job Position
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    meta: {
      label: 'Job Position',
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    meta: {
      label: 'Email',
    },
  },
  {
    accessorKey: 'user_role',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Role
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    meta: {
      label: 'Role',
    },
  },
  {
    id: 'status',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const employeeId = row.original.employee_id;
      const { data: statusHistory, isLoading } = useEmployeeCurrentStatus(employeeId);
      const latestStatus = statusHistory && statusHistory.length > 0 ? statusHistory[0] : null;
      return (
        <span
          className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(latestStatus?.status_set)}`}
        >
          {isLoading ? 'Loading...' : latestStatus?.status_set ? latestStatus.status_set : 'No Status'}
        </span>
      );
    },
    meta: {
      label: 'Status',
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    meta: {
      label: 'Actions',
    },
    cell: ({ row }) => {
      const item = row.original;
      const [suspendOpen, setSuspendOpen] = useState(false);
      const [updateStatusOpen, setUpdateStatusOpen] = useState(false);
      const [activateOpen, setActivateOpen] = useState(false);
      const { mutate: deleteRecord, isPending: isSuspending } = useDeleteRecord();
      const { data: statusHistory } = useEmployeeCurrentStatus(item.employee_id);
      const latestStatus = statusHistory && statusHistory.length > 0 ? statusHistory[0] : null;

      // Handlers to open dialogs after dropdown closes
      const openSuspendDialog = () => setTimeout(() => setSuspendOpen(true), 0);
      const openUpdateStatusDialog = () => setTimeout(() => setUpdateStatusOpen(true), 0);
      const openActivateDialog = () => setTimeout(() => setActivateOpen(true), 0);

      // If latest status is 'employee_created', show only Activate Account in the dropdown
      if (latestStatus?.status_set === 'employee_created') {
        return (
          <>
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <EllipsisVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={openActivateDialog}>Activate Account</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Dialog open={activateOpen} onOpenChange={setActivateOpen}>
              <DialogContent className="bg-white" onClick={(e) => e.stopPropagation()}>
                <ActivateAccountForm
                  employee_id={item.employee_id}
                  onSuccess={() => setActivateOpen(false)}
                  onCancel={() => setActivateOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </>
        );
      }

      const handleSuspend = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
          await deleteRecord(item.employee_id);
          alert('Account suspended successfully!');
          setSuspendOpen(false);
        } catch (error) {
          console.error('Failed to suspend account:', error);
        }
      };

      return (
        <>
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <EllipsisVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {latestStatus?.status_set !== 'terminated' && latestStatus?.status_set !== 'resigned' && (
                  <DropdownMenuItem onClick={openSuspendDialog} className="text-red-500">
                    <Ban className="h-4 w-4 mr-2" /> Suspend
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={openUpdateStatusDialog}>Update Status</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Suspend Dialog (always mounted, open controlled by state) */}
          <Dialog open={suspendOpen} onOpenChange={setSuspendOpen}>
            <DialogContent className="bg-white" onClick={(e) => e.stopPropagation()}>
              <DialogHeader>
                <DialogTitle className="flex justify-center items-center">
                  <span className="text-[#EE7A2A] text-3xl font-lg text-center">Confirm Suspension</span>
                </DialogTitle>
              </DialogHeader>
              <div className="flex justify-center items-center">
                <p className="text-center">Are you sure you want to suspend this account?</p>
              </div>
              <div className="px-5 pt-5 flex justify-center gap-x-6">
                <Button onClick={handleSuspend} className="bg-[#EE7A2A] text-white w-[10rem]" disabled={isSuspending}>
                  {isSuspending ? 'Suspending...' : 'Suspend'}
                </Button>
                <Button
                  className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]"
                  disabled={isSuspending}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSuspendOpen(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          {/* Update Status Dialog (always mounted, open controlled by state) */}
          <UpdateStatusDialog
            open={updateStatusOpen}
            onOpenChange={setUpdateStatusOpen}
            employeeId={item.employee_id}
          />
        </>
      );
    },
  },
];
