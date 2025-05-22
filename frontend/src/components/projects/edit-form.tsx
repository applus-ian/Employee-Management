import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Project } from '@/schemas';
import { useRecords } from '@/hooks/records/use-fetch-records';

interface EditProjectFormProps {
  project: Project;
  onCancel: () => void;
  onSave: (updatedProject: Project) => void;
}

export function EditProjectForm({ project, onCancel, onSave }: EditProjectFormProps) {
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [start_date, setStartDate] = useState(project.start_date);
  const [end_date, setEndDate] = useState(project.end_date);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useRecords();

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
      setStartDate(project.start_date);
      setEndDate(project.end_date);
    }
  }, [project]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    try {
      await onSave({ ...project, name, description, start_date, end_date });
      onCancel();
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Edit Project</h2>
        <div className="flex gap-2">
          <Button
            variant="destructive"
            className="bg-red-500 text-white hover:bg-red-600 shadow-lg rounded-xl transition-colors"
            onClick={() => setOpenDeleteDialog(true)}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="bg-white rounded-xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center text-orange-500 text-2xl font-semibold text-center">
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center">
            <p className="text-center text-gray-600">Are you sure you want to delete this project?</p>
          </div>
          <div className="px-5 pt-5 flex justify-center gap-x-6">
            <Button className="bg-orange-500 text-white hover:bg-orange-600 w-[10rem] rounded-xl transition-colors">
              Confirm
            </Button>
            <Button
              className="bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 w-[10rem] rounded-xl transition-colors"
              onClick={() => setOpenDeleteDialog(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Project Name</label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border rounded-xl px-4 py-2 hover:border-orange-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Start Date</label>
          <Input
            id="start_date"
            type="date"
            value={start_date}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="border rounded-xl px-4 py-2 hover:border-orange-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
          <textarea
            className="w-full border rounded-xl px-4 py-2 text-sm resize-none hover:border-orange-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 h-[130px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">End Date (Optional)</label>
          <Input
            id="end_date"
            type="date"
            value={end_date}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-xl px-4 py-2 hover:border-orange-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </form>

      {/* Table for Assigned Employees */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-8 border-t pt-8 border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Assigned Employees</h3>
          <Button
            className="bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
            onClick={() => setOpenAssignModal(true)}
          >
            Assign Employee
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 -960 960 960" fill="currentColor">
              <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
            </svg>
          </Button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-700">Employee ID</TableHead>
                <TableHead className="text-gray-700">Profile</TableHead>
                <TableHead className="text-gray-700">Full Name</TableHead>
                <TableHead className="text-gray-700">Job Position</TableHead>
                <TableHead className="text-gray-700">Department</TableHead>
                <TableHead className="text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {project.employees?.map((emp) => (
                <TableRow key={emp.id} className="hover:bg-orange-50/50 transition-colors">
                  <TableCell>{emp.id}</TableCell>
                  <TableCell>
                    <img
                      src={emp.profile ?? '/default-avatar.png'}
                      alt={emp.full_name}
                      className="w-8 h-8 rounded-full"
                    />
                  </TableCell>
                  <TableCell>{emp.full_name}</TableCell>
                  <TableCell>{emp.job_position}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 border-none bg-transparent hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter />
          </Table>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-2 mt-6 pt-3">
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-orange-500 text-white hover:bg-orange-600 shadow-lg rounded-xl transition-colors"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
          className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 shadow-lg rounded-xl transition-colors"
        >
          Cancel
        </Button>
      </div>

      {/* Dialog for Assigning Employee */}
      <Dialog open={openAssignModal} onOpenChange={setOpenAssignModal}>
        <DialogContent className="sm:max-w-md bg-white rounded-xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-orange-500 text-center text-lg font-bold uppercase">
              Available Employees
            </DialogTitle>
            <p className="text-sm text-center mt-1 text-gray-600">Select an employee/s</p>
          </DialogHeader>

          <div className="p-2 border rounded-xl border-gray-200 bg-gray-50">
            {data?.records.users.map((emp) => (
              <label
                key={emp.employee.id}
                className="flex items-center gap-3 text-sm cursor-pointer px-2 py-1 hover:bg-orange-50/50 rounded-md transition-colors"
              >
                <Checkbox
                  className="w-5 h-5 border border-gray-400 focus:ring-0 focus:ring-offset-0 focus:outline-none data-[state=checked]:bg-orange-500 data-[state=checked]:text-white data-[state=checked]:border-orange-500"
                  checked={selectedEmployees.includes(emp.employee.id)}
                  onCheckedChange={(checked) => {
                    setSelectedEmployees((prev) =>
                      checked ? [...prev, emp.employee.id] : prev.filter((id) => id !== emp.employee.id),
                    );
                  }}
                />
                <div>
                  <p className="font-medium text-gray-900">
                    {emp.employee.first_name} {emp.employee.last_name}
                  </p>
                  <p className="text-muted-foreground text-xs">{emp.employee.job_position.title}</p>
                </div>
              </label>
            ))}
          </div>

          <DialogFooter className="mt-4 flex justify-center gap-2">
            <Button
              className="bg-orange-500 text-white hover:bg-orange-600 px-6 rounded-xl transition-colors"
              onClick={() => {
                console.log('Assigned:', selectedEmployees);
                setOpenAssignModal(false);
              }}
            >
              Assign
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpenAssignModal(false)}
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 rounded-xl transition-colors"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
