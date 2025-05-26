'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogClose } from '@/components/ui/dialog';
import EditEmploymentTypeForm from './edit-form';
import { useState } from 'react';
import { EmploymentType } from '@/schemas';
import { useUpdateEmploymentType } from '@/hooks/settings/employee/employment-type/use-update-employment-type';
import { useDeleteEmploymentType } from '@/hooks/settings/employee/employment-type/use-delete-employment-type';
import toast from 'react-hot-toast';

export const columns: ColumnDef<EmploymentType>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Employment Type Name
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
      const { mutate: updateEmploymentType } = useUpdateEmploymentType();
      const { mutate: deleteEmploymentType, isPending: isDeleting } = useDeleteEmploymentType();

      // These functions live inside the cell function and are available to your dialog
      const handleCancel = () => {
        console.log('Cancelled');
      };

      const handleSave = async (updatedData: EmploymentType) => {
        try {
          await updateEmploymentType(updatedData);
          toast.success(`Employment type changed to "${updatedData.name}"!`);
          setEditOpen(false);
        } catch (error) {
          console.error('Failed to update employment type:', error);
        }
      };

      const handleDelete = async () => {
        try {
          await deleteEmploymentType(item.id);
          toast.success('Employment type deleted successfully!');
          setDeleteOpen(false);
        } catch (error) {
          console.error('Failed to delete employment type:', error);
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
            <EditEmploymentTypeForm employment_type={item} onCancel={handleCancel} onSave={handleSave} />
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
                <p className="text-center">Do you want to delete this Employment Type?</p>
              </div>
              <div className=" px-5 pt-5 flex justify-center gap-x-6">
                <Button onClick={handleDelete} className="bg-[#EE7A2A] text-white w-[10rem]" disabled={isDeleting}>
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
                <DialogClose asChild>
                  <Button className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]">Cancel</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
