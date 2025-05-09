import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
interface NewProjectFormProps {
  onCancel: () => void;
  onSave: (projectData: {
    projectName: string;
    startDate: string;
    endDate: string;
    description: string;
    employees: string[];
  }) => void;
}

export default function NewProjectForm({ onCancel, onSave }: NewProjectFormProps) {
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  const employees = [
    { id: '1', name: 'Angelo Fernandez', role: 'Software Developer' },
    { id: '2', name: 'Leon Monte', role: 'Engineer' },
    { id: '3', name: 'Carteris Cartezan', role: 'IT Manager' },
    { id: '4', name: 'Pierce Gonzalez', role: 'Software Developer' },
    { id: '5', name: 'Mac De Guzman', role: 'Software Developer' },
    { id: '6', name: 'Beau Santiago', role: 'Solutions Architect' },
    { id: '7', name: 'Shawn Murphy', role: 'Engineer' },
  ];

  const handleSave = () => {
    onSave({
      projectName,
      startDate,
      endDate,
      description,
      employees: selectedEmployees,
    });
    onCancel(); // Close the form after saving
  };

  return (
    <div className="p-4 mb-6 space-y-6 bg-white ">
      <h2 className="text-xl font-bold">Update Project</h2>
      <p className="text-sm text-muted-foreground mt-1">Fill in the basic project information below.</p>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 scroll ">
        <div>
          <Label className="block text-sm font-medium mb-1">Project Name</Label>
          <Input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="border-gray-300 border rounded-xl hover:border-orange-400"
          />
        </div>

        <div>
          <Label className="block text-sm font-medium mb-1">Start Date</Label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border-gray-300 border rounded-xl w-full px-3 py-2 hover:border-orange-400"
          />
        </div>

        <div className="md:col-span-1">
          <Label className="block text-sm font-medium mb-1">Description</Label>
          <textarea
            className="border-gray-300 w-full border rounded-xl px-3 py-2 text-sm resize-none hover:border-orange-400 h-[130px]"
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <Label className="block text-sm font-medium mb-1">End Date</Label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border-gray-300 border rounded-xl w-full px-3 py-2 hover:border-orange-400"
          />
        </div>
      </form>

      <div className="border-t pt-10 border-gray-400">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-xl font-bold">Assigned Employees</h2>
            <p className="text-sm text-muted-foreground mt-1">Select team members to work on this project.</p>
          </div>

          <Button
            onClick={() => setOpenAssignModal(true)}
            className="border border-orange-400 text-orange-500 hover:bg-orange-400 hover:text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
          >
            Assign Employee
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 -960 960 960" fill="currentColor">
              <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
            </svg>
          </Button>
        </div>

        <Dialog open={openAssignModal} onOpenChange={setOpenAssignModal}>
          <DialogContent className="sm:max-w-md bg-white rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-orange-500 text-center text-lg font-bold uppercase">
                Available Employees
              </DialogTitle>
              <p className="text-sm text-center mt-1 text-gray-600">Select an employee/s</p>
            </DialogHeader>

            <CardContent className="p-2 border rounded-xl border-gray-350 bg-gray-100 ">
              <div className="max-h-80 overflow-y-auto rounded-md p-2 space-y-2 pt-3">
                {employees.map((emp) => (
                  <Label
                    key={emp.id}
                    className="flex items-center gap-3 text-sm cursor-pointer px-2 py-1 hover:bg-muted/50 rounded-md"
                  >
                    <Checkbox
                      className="w-5 h-5 border border-gray-400 focus:ring-0 focus:ring-offset-0 focus:outline-none data-[state=checked]:bg-orange-500 data-[state=checked]:text-white data-[state=checked]:border-orange-500"
                      checked={selectedEmployees.includes(emp.id)}
                      onCheckedChange={(checked) => {
                        setSelectedEmployees((prev) =>
                          checked ? [...prev, emp.id] : prev.filter((id) => id !== emp.id),
                        );
                      }}
                    />
                    <div>
                      <p className="font-medium">{emp.name}</p>
                      <p className="text-muted-foreground text-xs">{emp.role}</p>
                    </div>
                  </Label>
                ))}
              </div>
            </CardContent>

            <div className="mt-4 flex justify-center gap-2">
              <Button
                className="bg-orange-500 text-white hover:bg-orange-600 px-6"
                onClick={() => {
                  console.log('Assigned:', selectedEmployees);
                  setOpenAssignModal(false);
                }}
              >
                Assign
              </Button>
              <Button
                variant="outline"
                className="bg-white border-orange-400 text-orange-500 hover:bg-orange-50"
                onClick={() => setOpenAssignModal(false)}
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Profile</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Job Position</TableHead>
                <TableHead>Department</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No Employees assigned
                  </TableCell>
                </TableRow>
              ) : (
                selectedEmployees.map((empId) => {
                  const emp = employees.find((e) => e.id === empId);
                  return (
                    <TableRow key={emp?.id}>
                      <TableCell>{emp?.id}</TableCell>
                      <TableCell>Profile</TableCell>
                      <TableCell>{emp?.name}</TableCell>
                      <TableCell>{emp?.role}</TableCell>
                      <TableCell>Department</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex gap-2 mt-6 pt-3">
        <Button className="bg-orange-500 text-white hover:bg-orange-600" onClick={handleSave}>
          Create
        </Button>
      </div>
    </div>
  );
}
