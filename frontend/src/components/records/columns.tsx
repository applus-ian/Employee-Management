'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { RecordCol } from '@/schemas';
import { useDeleteRecord } from '@/hooks/records/use-delete-record';
import api from '@/utils/api/apiInstance';

interface EmploymentStatusHistoryEntry {
  id: string;
  status: string;
  changed_at: string;
  changed_by: string;
  remarks?: string;
}

const getStatusColor = (status: string) => {
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
      const [currentStatus, setCurrentStatus] = useState<string>('Loading...');
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
        const fetchStatus = async () => {
          try {
            const response = await api.get(`/employment-status-histories/${row.original.employee_id}`);
            const history = response.data as EmploymentStatusHistoryEntry[];
            if (history.length > 0) {
              const sortedHistory = [...history].sort(
                (a, b) => new Date(b.changed_at).getTime() - new Date(a.changed_at).getTime(),
              );
              setCurrentStatus(sortedHistory[0].status);
            }
          } catch (error) {
            console.error('Failed to load status:', error);
            setCurrentStatus('Unknown');
          } finally {
            setIsLoading(false);
          }
        };

        fetchStatus();
      }, [row.original.employee_id]);

      return (
        <span
          className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(currentStatus)}`}
        >
          {isLoading ? 'Loading...' : currentStatus}
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
      const { mutate: deleteRecord, isPending: isSuspending } = useDeleteRecord();

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
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          {/* Suspend Dialog */}
          <Dialog open={suspendOpen} onOpenChange={setSuspendOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={(e) => e.stopPropagation()}
              >
                <Ban className="h-4 w-4 mr-2" />
                Suspend
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
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
                <DialogClose asChild>
                  <Button
                    className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]"
                    disabled={isSuspending}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
