'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { EditProjectRoleForm } from './edit-form';
import { ProjectRole } from '@/schemas';
import { useState } from 'react';
import { useUpdateProjectRole } from '@/hooks/settings/employee/project-role/use-update-project-role';
import { useDeleteProjectRole } from '@/hooks/settings/employee/project-role/use-delete-project-role';
import toast from 'react-hot-toast';
// This type defines each row's data

export const columns: ColumnDef<ProjectRole>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Role Name
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
      const { mutate: updateProjectRole } = useUpdateProjectRole();
      const { mutate: deleteProjectRole, isPending: isDeleting } = useDeleteProjectRole();
      // These functions live inside the cell function and are available to your dialog
      const handleCancel = () => {
        console.log('false');
      };

      const handleSave = async (updatedData: ProjectRole) => {
        try {
          await updateProjectRole(updatedData);
          toast.success(`Project role changed to "${updatedData.name}"!`);
          setEditOpen(false);
        } catch (error) {
          console.error('Failed to update project role:', error);
        }
      };

      const handleDelete = async () => {
        try {
          await deleteProjectRole(item.id);
          toast.success('Project role deleted successfully!');
          setDeleteOpen(false);
        } catch (error) {
          console.error('Failed to delete project role:', error);
        }
      };

      return (
        <div className="flex gap-2">
          {/* Edit Dialog */}
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <button className="text-[#624DE3] hover:text-[#624DE3]">
                <Edit size={18} />
              </button>
            </DialogTrigger>
            <EditProjectRoleForm project_role={item} onCancel={handleCancel} onSave={handleSave} />
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
                <p className="text-center">Do you want to delete this Project Role?</p>
              </div>

              <div className=" px-5 pt-5 flex justify-center gap-x-6">
                <Button
                  onClick={handleDelete} // Call handleDelete to delete the document
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
