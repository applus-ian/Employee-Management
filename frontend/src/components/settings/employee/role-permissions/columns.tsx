import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogClose } from '@/components/ui/dialog';
import EditRoleForm from './edit-form';
import { RoleWithPermissions } from '@/types/settings/employee/roles-and-permission/roleAndPermission';
import { useState } from 'react';
import { deleteRole } from '@/utils/api/settings/employee/role-and-permission/deleteRoleWithPermissions';
import toast from 'react-hot-toast';

export const columns: ColumnDef<RoleWithPermissions>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        User Role
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span className="capitalize">{row.original.name}</span>,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Description
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span className="text-sm text-gray-700">{row.original.description}</span>,
  },

  {
    accessorKey: 'permissions',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Permissions
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const permissionsText = row.original.permissions.map((perm) => perm.name).join(', ');

      return (
        <div
          className="text-sm text-gray-700"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal', // allow wrapping to multiple lines
            maxWidth: '90%', // adjust this width to your column width
          }}
          title={permissionsText}
        >
          {permissionsText}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const item = row.original;
      // Dialog control state
      const [isDialogOpen, setDialogOpen] = useState(false);
      const [isDeleteOpen, setDeleteOpen] = useState(false);

      const handleCancel = () => {
        setDialogOpen(false); // Close the dialog
        console.log('Cancelled');
      };

      const handleSave = () => {
        setDialogOpen(false); // Close dialog after save
        console.log('Saved', item);
      };

      const handleDelete = async () => {
        try {
          await deleteRole(item.id);
          toast.success('Role with permissions deleted successfully!');
          setDeleteOpen(false);
        } catch (error) {
          console.error('Failed to delete  role with permissions:', error);
        }
      };

      return (
        <div className="flex gap-2">
          {/* Edit */}
          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button className="text-blue-500 hover:text-blue-700">
                <Edit size={18} />
              </button>
            </DialogTrigger>
            <EditRoleForm onCancel={handleCancel} onSave={handleSave} role={item} />
          </Dialog>

          {/* Delete */}
          <Dialog open={isDeleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger asChild>
              <button className="text-red-500 hover:text-red-700">
                <Trash2 size={18} />
              </button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle className="text-center text-[#EE7A2A] text-2xl font-bold">Confirm Deletion?</DialogTitle>
              </DialogHeader>
              <p className="text-center">Do you want to delete this role?</p>
              <DialogClose asChild>
                <div className="px-5 pt-5 flex justify-center gap-x-6">
                  <Button onClick={handleDelete} className="bg-[#EE7A2A] text-white w-[10rem]">
                    Delete
                  </Button>
                  <Button className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]">Cancel</Button>
                </div>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
