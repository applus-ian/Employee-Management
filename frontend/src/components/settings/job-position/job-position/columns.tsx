'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { EditJobPositionForm } from './edit-form';
import { useState } from 'react';
import { JobPosition } from '@/schemas';
import { useUpdateJobPosition } from '@/hooks/settings/job-position/job-position/use-update-job-position';
import { useDeleteJobPosition } from '@/hooks/settings/job-position/job-position/use-delete-job-position';
import toast from 'react-hot-toast';

export const columns: ColumnDef<JobPosition>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Job Position Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const item = row.original;
      const [editOpen, setEditOpen] = useState(false);
      const [deleteOpen, setDeleteOpen] = useState(false);
      const { mutate: updateJobPosition } = useUpdateJobPosition();
      const { mutate: deleteJobPosition, isPending: isDeleting } = useDeleteJobPosition();

      const handleCancel = () => {
        setEditOpen(false);
      };

      const handleSave = async (updatedData: JobPosition) => {
        try {
          await updateJobPosition(updatedData);
          toast.success(`Job position title changed to "${updatedData.title}"!`);
          setEditOpen(false);
        } catch (error) {
          toast.error('Failed to update job position!');
          console.error('Failed to update job position:', error);
        }
      };

      const handleDelete = async () => {
        try {
          await deleteJobPosition(item.id);
          toast.success('Job position deleted successfully!');
          setDeleteOpen(false);
        } catch (error) {
          toast.error('Failed to delete job position!');
          console.error('Failed to delete job position:', error);
        }
      };

      return (
        <div className="flex gap-2">
          {/* Edit Dialog */}
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <button className="text-blue-500 hover:text-blue-700">
                <Edit size={18} />
              </button>
            </DialogTrigger>
            <DialogContent className="bg-white w-[50%]">
              <DialogHeader>
                <DialogTitle>Edit Job Position</DialogTitle>
              </DialogHeader>
              <EditJobPositionForm job_position={item} onCancel={handleCancel} onSave={handleSave} />
            </DialogContent>
          </Dialog>

          {/* Delete Dialog */}
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger asChild>
              <button className="text-red-500 hover:text-red-700">
                <Trash2 size={18} />
              </button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle className="flex justify-center items-center">
                  <span className="text-[#EE7A2A] text-3xl font-lg text-center">Confirm Deletion?</span>
                </DialogTitle>
              </DialogHeader>
              <div className="flex justify-center items-center">
                <p className="text-center">Do you want to delete this Job Position?</p>
              </div>
              <div className="px-5 pt-5 flex justify-center gap-x-6">
                <Button onClick={handleDelete} className="bg-[#EE7A2A] text-white w-[10rem]" disabled={isDeleting}>
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
                <DialogClose asChild>
                  <Button className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]" disabled={isDeleting}>
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
