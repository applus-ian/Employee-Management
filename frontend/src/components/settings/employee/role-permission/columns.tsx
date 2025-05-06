import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogClose } from '@/components/ui/dialog';
import EditRoleForm from './edit-form';

// This type defines each row's data
export type Role_Permission = {
  role: string;
  permission: number;
};

export const columns: ColumnDef<Role_Permission>[] = [
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        User Role
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'permission',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Permissions
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const item = row.original;

      // These functions live inside the cell function and are available to your dialog
      const handleCancel = () => {
        console.log('Cancelled');
      };

      const handleSave = () => {
        console.log('Saved', item); // You can access the current item here too
      };

      return (
        <div className="flex gap-2">
          {/* Edit Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-blue-500 hover:text-blue-700">
                <Edit size={18} />
              </button>
            </DialogTrigger>
            <EditRoleForm onCancel={handleCancel} onSave={handleSave} />
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <button className="text-red-500 hover:text-red-700">
                <Trash2 size={18} />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex justify-center items-center">
                  <span className="text-[#EE7A2A] text-3xl font-lg text-center">Confirm Deletion?</span>
                </DialogTitle>
              </DialogHeader>
              <div className="flex justify-center items-center">
                <p className="text-center">Do you want to delete this Employee Role?</p>
              </div>
              <DialogClose asChild>
                <div className=" px-5 pt-5 flex justify-center gap-x-6">
                  <Button className="bg-[#EE7A2A] text-white w-[10rem]">Save Changes</Button>
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
