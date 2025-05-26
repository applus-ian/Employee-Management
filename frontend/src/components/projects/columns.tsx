'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { EditProjectForm } from './edit-form';
import { useState } from 'react';
import { useUpdateProject } from '@/hooks/projects/use-update-project';
import { useDeleteProject } from '@/hooks/projects/use-delete-project';
import { Project } from '@/types/projects/project';
import toast from 'react-hot-toast';

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Project ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Description
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'start_date',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Start Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'end_date',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        End Date
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
      const { mutate: updateProject } = useUpdateProject();
      const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

      const handleCancel = () => {
        setEditOpen(false); // Close the edit dialog when cancel is clicked
      };

      const handleSave = async (updatedData: Project) => {
        try {
          await updateProject(updatedData);
          toast.success(`Project successfully updated!`);
          setEditOpen(false);
        } catch (error) {
          console.error('Failed to update project:', error);
        }
      };

      const handleDelete = async () => {
        try {
          await deleteProject(item.id);
          toast.success('Project deleted successfully!');
          setDeleteOpen(false);
        } catch (error) {
          toast.error('Failed to delete project');
          console.error('Failed to delete project:', error);
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
            <DialogContent className="bg-white w-[75%]">
              <DialogHeader>
                <DialogTitle>Edit Project</DialogTitle>
              </DialogHeader>
              <EditProjectForm
                project={item} // Pass the project data to the edit form
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
                <p className="text-center">Do you want to delete this Project?</p>
              </div>
              <div className="px-5 pt-5 flex justify-center gap-x-6">
                <Button
                  onClick={handleDelete} // Call handleDelete to delete the project
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
