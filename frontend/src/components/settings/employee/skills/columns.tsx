import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogClose } from '@/components/ui/dialog';
import EditSkillForm from './edit-form';
import { Badge } from '@/components/ui/badge';

// This type defines each row's data
export type Skill = {
  skillName: string;
  description: string;
  category: string;
};

export const columns: ColumnDef<Skill>[] = [
  {
    accessorKey: 'skillName',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Skill Name
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
    accessorKey: 'category',
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-center"
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const category = row.getValue<string>('category');

      const getBadgeClass = (category: string) => {
        switch (category) {
          case 'Technical':
            return 'bg-[#C0DFFF] text-[#007BFF]';
          case 'Functional':
            return 'bg-[#C9FFEF] text-[#20C997]';
          case 'Leadership':
            return 'bg-[#FFF4D4] text-[#FFC107]';
          default:
            return 'bg-gray-100 text-gray-600';
        }
      };

      return (
        <div className="flex justify-center items-center">
          <Badge className={getBadgeClass(category)}>{category}</Badge>
        </div>
      );
    },
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
            <EditSkillForm onCancel={handleCancel} onSave={handleSave} />
          </Dialog>

          {/* Delete Dialog */}
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
                <p className="text-center">Do you want to delete this Employee Skill?</p>
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
