'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { EditOfficeAssignForm } from './edit-form';
import { useState } from 'react';
import { OfficeAssign } from '@/schemas';
import { useUpdateOfficeAssign } from '@/hooks/settings/job-position/office-assign/use-update-office-assign';
import { useDeleteOfficeAssign } from '@/hooks/settings/job-position/office-assign/use-delete-office-assign';

export const columns: ColumnDef<OfficeAssign>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Office Assign Name
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
      const { mutate: updateOfficeAssign } = useUpdateOfficeAssign();
      const { mutate: deleteOfficeAssign, isPending: isDeleting } = useDeleteOfficeAssign();

      const handleCancel = () => {
        setEditOpen(false); // Close the edit dialog when cancel is clicked
      };

      const handleSave = async (updatedData: OfficeAssign) => {
        try {
          await updateOfficeAssign(updatedData);
          alert(`Office assign changed to "${updatedData.name}"!`);
          setEditOpen(false);
        } catch (error) {
          console.error('Failed to update office assign:', error);
        }
      };

      const handleDelete = async () => {
        try {
          await deleteOfficeAssign(item.id);
          alert('Office assign deleted successfully!');
          setDeleteOpen(false);
        } catch (error) {
          console.error('Failed to delete office assign:', error);
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
                <DialogTitle>Edit Office Assign</DialogTitle>
              </DialogHeader>
              <EditOfficeAssignForm
                office_assign={item} // Pass the office data to the edit form
                onCancel={handleCancel}
                onSave={handleSave} // Handle the save action here
              />
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
                <p className="text-center">Do you want to delete this Office Assign?</p>
              </div>
              <div className="px-5 pt-5 flex justify-center gap-x-6">
                <Button
                  onClick={handleDelete} // Call handleDelete to delete the office assign
                  className="bg-[#EE7A2A] text-white w-[10rem]"
                  disabled={isDeleting} // Disable button while deleting
                >
                  {isDeleting ? 'Deleting...' : 'Delete'} {/* Show 'Deleting...' while loading */}
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
