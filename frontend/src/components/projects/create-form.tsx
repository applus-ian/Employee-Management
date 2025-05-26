import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useRecords } from '@/hooks/records/use-fetch-records';
import { useCreateProject } from '@/hooks/projects/use-create-project';
import { createProjectSchema } from '@/schemas/projects/project';
import { useProjectRole } from '@/hooks/settings/employee/project-role/use-fetch-project-roles';
import { CreateProject } from '@/types/projects/project';
import { ProjectRole } from '@/types/settings/employee/project-role/projectRole';
import toast from 'react-hot-toast';

interface NewProjectFormProps {
  onCancel: () => void;
  onSave: (projectData: CreateProject) => void;
}

export default function NewProjectForm({ onCancel, onSave }: NewProjectFormProps) {
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [employeeProjectRoles, setEmployeeProjectRoles] = useState<{ [key: string]: number }>({});
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const { data: employees } = useRecords();
  const { data: projectRoles } = useProjectRole();
  const { mutate: createProject, isPending } = useCreateProject();

  // Handle form submission with Zod validation
  const handleCreateProject = () => {
    const employeeData = selectedEmployees.map((id) => ({
      id,
      project_role_id: employeeProjectRoles[id],
    }));

    // Check for missing roles
    const missingRoles = employeeData.some((emp) => !emp.project_role_id);
    if (missingRoles) {
      setValidationErrors((prev) => ({
        ...prev,
        employees: 'Each assigned employee must have a project role selected.',
      }));
      return;
    }

    const parsed = createProjectSchema.safeParse({
      name: projectName,
      description: description || undefined || null,
      employees: employeeData || undefined || null,
      start_date: startDate,
      end_date: endDate || undefined || null,
    });

    if (!parsed.success) {
      console.log(parsed);
      // Set validation errors
      const errors: { [key: string]: string } = {};
      parsed.error.errors.forEach((error) => {
        errors[error.path[0]] = error.message;
      });
      setValidationErrors(errors);
      console.error(parsed.error.flatten().fieldErrors);
      return;
    }

    console.log(parsed.data);

    createProject(parsed.data, {
      onSuccess: () => {
        toast.success('Project created successfully!');
        onSave(parsed.data);
      },
      onError: (err) => {
        toast.error('Project creation failed!');
        console.error('Error creating project:', err);
      },
    });
  };

  const handleRoleChange = (empId: string, roleId: number) => {
    setEmployeeProjectRoles((prev) => ({ ...prev, [empId]: roleId }));
  };

  return (
    <div className="p-4 mb-6 space-y-6">
      {/* Project Info Form */}
      <div>
        <h2 className="text-xl font-bold">Add New Project</h2>
        <p className="text-sm text-muted-foreground mt-1">Fill in the basic project information below.</p>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Project Name</label>
          <Input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="border rounded-xl px-4 py-2 hover:border-orange-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
          {validationErrors.name && <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-xl w-full px-4 py-2 hover:border-orange-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
          {validationErrors.start_date && <p className="text-red-500 text-sm mt-1">{validationErrors.start_date}</p>}
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border rounded-xl px-4 py-2 text-sm resize-none hover:border-orange-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 h-[130px]"
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {validationErrors.description && <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Date (Optional)</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-xl w-full px-4 py-2 hover:border-orange-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
          {validationErrors.end_date && <p className="text-red-500 text-sm mt-1">{validationErrors.end_date}</p>}
        </div>
      </form>

      {/* Assign Employees */}
      <div className="border-t pt-10 border-gray-400">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-xl font-bold">Assigned Employees</h2>
            <p className="text-sm text-muted-foreground mt-1">Select team members to work on this project.</p>
          </div>

          <Button
            onClick={() => setOpenAssignModal(true)}
            className="bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
          >
            Assign Employee
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 -960 960 960" fill="currentColor">
              <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
            </svg>
          </Button>
        </div>

        {/* Modal */}
        <Dialog open={openAssignModal} onOpenChange={setOpenAssignModal}>
          <DialogContent className="w-full lg:w-[25%] bg-white rounded-xl shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-orange-500 text-center text-lg font-bold uppercase">
                Available Employees
              </DialogTitle>
              <p className="text-sm text-center mt-1 text-gray-600">Select an employee/s</p>
            </DialogHeader>

            <CardContent className="p-2 border rounded-xl border-gray-200 bg-gray-50">
              <div className="max-h-80 overflow-y-auto rounded-md p-2 space-y-2 pt-3">
                {employees?.records.users.map((user) => (
                  <label
                    key={user.employee.id}
                    className="flex items-center gap-3 text-sm cursor-pointer px-2 py-1 hover:bg-muted/50 rounded-md"
                  >
                    <Checkbox
                      className="w-5 h-5 border border-gray-400 focus:ring-0 focus:ring-offset-0 focus:outline-none data-[state=checked]:bg-orange-500 data-[state=checked]:text-white data-[state=checked]:border-orange-500"
                      checked={selectedEmployees.includes(user.employee.id)}
                      onCheckedChange={(checked) => {
                        setSelectedEmployees((prev) =>
                          checked ? [...prev, user.employee.id] : prev.filter((id) => id !== user.employee.id),
                        );
                      }}
                    />
                    <div>
                      <p className="font-medium">
                        {user.employee.first_name} {user.employee.last_name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {user.roles.map((role: ProjectRole) => role.name).join(', ')}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </CardContent>

            <div className="mt-4 flex justify-center gap-2">
              <Button
                className="bg-orange-500 text-white hover:bg-orange-600 px-6 rounded-xl transition-colors"
                onClick={() => setOpenAssignModal(false)}
              >
                Assign
              </Button>
              <Button
                variant="outline"
                className="bg-white border-orange-400 text-orange-500 hover:bg-orange-50 rounded-xl transition-colors"
                onClick={() => setOpenAssignModal(false)}
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Assigned Table */}
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Profile</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Job Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Project Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No Employees assigned
                  </TableCell>
                </TableRow>
              ) : (
                selectedEmployees.map((empId) => {
                  const userRecord = employees?.records.users.find((user) => user.employee.id === empId);
                  const emp = userRecord?.employee;
                  return (
                    <TableRow key={emp?.id}>
                      <TableCell>{emp?.id}</TableCell>
                      <TableCell>Profile</TableCell>
                      <TableCell>
                        {emp?.first_name} {emp?.last_name}
                      </TableCell>
                      <TableCell>{emp?.job_position.title}</TableCell>
                      <TableCell>{emp?.location_assignment?.department_assign?.name ?? 'N/A'}</TableCell>
                      <TableCell>
                        <select
                          className="border rounded-md px-2 py-1 text-sm"
                          value={employeeProjectRoles[empId]}
                          onChange={(e) => handleRoleChange(empId, Number(e.target.value))}
                        >
                          <option value="">Select Role</option>
                          {projectRoles?.map((role) => (
                            <option key={role.id} value={role.id}>
                              {role.name}
                            </option>
                          ))}
                        </select>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="px-5 pt-5 flex justify-center gap-x-6">
        <Button onClick={handleCreateProject} disabled={isPending} className="bg-[#EE7A2A] text-white w-[10rem]">
          Create
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
          className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
