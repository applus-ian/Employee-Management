import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useRecords } from '@/hooks/records/use-fetch-records';
import { useUpdateProject } from '@/hooks/projects/use-update-project';
import { useProjectRole } from '@/hooks/settings/employee/project-role/use-fetch-project-roles';
import { UpdateProject, Project } from '@/types/projects/project';
import { ProjectRole } from '@/types/settings/employee/project-role/projectRole';
import toast from 'react-hot-toast';
import { updateProjectSchema } from '@/schemas/projects/project';
import { CardContent } from '../ui/card';

interface EditProjectFormProps {
  project: Project;
  onCancel: () => void;
  onSave: (updatedData: UpdateProject) => void;
}

export function EditProjectForm({ project, onCancel, onSave }: EditProjectFormProps) {
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [tempSelectedEmployees, setTempSelectedEmployees] = useState<string[]>([]);
  const [employeeProjectRoles, setEmployeeProjectRoles] = useState<{ [key: string]: number }>({});
  const [removedEmployees, setRemovedEmployees] = useState<string[]>([]);
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const { data: employees } = useRecords();
  const { data: projectRoles } = useProjectRole();
  const { mutate: updateProject, isPending } = useUpdateProject();

  useEffect(() => {
    setProjectName(project.name);
    setDescription(project.description ?? '');
    setStartDate(project.start_date);
    setEndDate(project.end_date ?? '');
    const assignedEmployeeIds = project.employees?.map((e) => e.id);
    setSelectedEmployees(assignedEmployeeIds || []);
    setTempSelectedEmployees(assignedEmployeeIds || []);
    setRemovedEmployees([]);

    const rolesMap: { [key: string]: number } = {};
    project.employees?.forEach((emp) => {
      rolesMap[emp.id] = emp.project_role_id;
    });
    setEmployeeProjectRoles(rolesMap);
  }, [project]);

  useEffect(() => {
    setTempSelectedEmployees(selectedEmployees);
  }, [selectedEmployees]);

  const handleUpdateProject = async () => {
    try {
      setIsLoading(true);
      // Validate that all selected employees have a role assigned
      const missingRoles = selectedEmployees.some((id) => !employeeProjectRoles[id]);
      if (missingRoles) {
        setValidationErrors((prev) => ({
          ...prev,
          employees: 'Each assigned employee must have a project role selected.',
        }));
        toast.error('Please assign roles to all employees before saving.');
        return;
      }

      const employeeData = selectedEmployees.map((id) => ({
        id,
        project_role_id: employeeProjectRoles[id],
      }));

      const parsed = updateProjectSchema.safeParse({
        id: project.id,
        name: projectName,
        description: description || undefined || null,
        employees: employeeData || undefined || null,
        start_date: startDate,
        end_date: endDate || undefined || null,
      });

      if (!parsed.success) {
        const errors: { [key: string]: string } = {};
        parsed.error.errors.forEach((error) => {
          errors[error.path[0]] = error.message;
        });
        setValidationErrors(errors);
        toast.error('Please fix the validation errors before saving.');
        return;
      }
      console.log('Parsed data:', parsed.data);
      await updateProject(parsed.data, {
        onSuccess: () => {
          toast.success('Project updated successfully!');
          onSave(parsed.data);
        },
        onError: (err) => {
          toast.error('Project update failed!');
          console.error('Error updating project:', err);
        },
      });
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = (empId: string, roleId: number) => {
    setEmployeeProjectRoles((prev) => ({ ...prev, [empId]: roleId }));
  };

  return (
    <div className="p-4 mb-6 space-y-6">
      {/* Project Info Form */}
      <div>
        <h2 className="text-xl font-bold">Edit Project</h2>
        <p className="text-sm text-muted-foreground mt-1">Modify project information below.</p>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
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
            type="button"
            onClick={() => setOpenAssignModal(true)}
            className="bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
          >
            Assign Employee
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 960 960" fill="currentColor">
              <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
            </svg>
          </Button>
        </div>

        {/* Modal */}
        <Dialog
          open={openAssignModal}
          onOpenChange={(open) => {
            if (!open) {
              // Reset temp selections when modal is closed without clicking continue
              setTempSelectedEmployees(selectedEmployees);
              // Clear any validation errors
              setValidationErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.employees;
                return newErrors;
              });
            }
            setOpenAssignModal(open);
          }}
        >
          <DialogContent className="w-full lg:w-[25%] bg-white rounded-xl shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-orange-500 text-center text-lg font-bold uppercase">
                Available Employees
              </DialogTitle>
              <p className="text-sm text-center mt-1 text-gray-600">Select an employee/s</p>
            </DialogHeader>

            <CardContent className="p-2 border rounded-xl border-gray-200 bg-gray-50">
              <div className="max-h-80 overflow-y-auto rounded-md p-2 space-y-2 pt-3">
                {employees?.records.users.map((user) => {
                  const isPreselected =
                    project.employees?.some((e) => e.id === user.employee.id) &&
                    !removedEmployees.includes(user.employee.id);
                  const isSelected = tempSelectedEmployees.includes(user.employee.id);
                  return (
                    <label
                      key={user.employee.id}
                      className={`flex items-center gap-3 text-sm cursor-pointer px-2 py-1 hover:bg-muted/50 rounded-md ${
                        isPreselected && isSelected ? 'opacity-50' : ''
                      }`}
                    >
                      <Checkbox
                        className="w-5 h-5 border border-gray-400 focus:ring-0 focus:ring-offset-0 focus:outline-none data-[state=checked]:bg-orange-500 data-[state=checked]:text-white data-[state=checked]:border-orange-500"
                        checked={isSelected}
                        disabled={(isPreselected && isSelected) || isPending}
                        onCheckedChange={(checked) => {
                          if (isPreselected && isSelected) return;
                          if (checked) {
                            setTempSelectedEmployees((prev) => [...prev, user.employee.id]);
                            // Clear validation errors when adding an employee
                            setValidationErrors((prev) => {
                              const newErrors = { ...prev };
                              delete newErrors.employees;
                              return newErrors;
                            });
                          } else {
                            setTempSelectedEmployees((prev) => prev.filter((id) => id !== user.employee.id));
                          }
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
                  );
                })}
              </div>
            </CardContent>

            <div className="mt-4 flex justify-center gap-2">
              <Button
                className="bg-orange-500 text-white hover:bg-orange-600 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  setSelectedEmployees(tempSelectedEmployees);
                  setOpenAssignModal(false);
                }}
                disabled={isPending}
              >
                Continue
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
                <TableHead>Full Name</TableHead>
                <TableHead>Job Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Project Role</TableHead>
                <TableHead>Actions</TableHead>
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
                  const emp = project.employees?.find((e) => e.id === empId) || userRecord?.employee;

                  if (!emp) return null;

                  // Handle display name based on the type of employee data
                  let displayName = '';
                  if ('full_name' in emp) {
                    displayName = emp.full_name || '';
                  } else {
                    displayName = `${emp.first_name} ${emp.last_name}`;
                  }

                  // Handle job title and department based on the type of employee data
                  let jobTitle = '';
                  let department = 'N/A';

                  if ('job_position' in emp) {
                    // Handle job position that could be string or object
                    if (typeof emp.job_position === 'string') {
                      jobTitle = emp.job_position;
                    } else if (emp.job_position && typeof emp.job_position === 'object') {
                      jobTitle = emp.job_position.title || '';
                    }
                    // Handle department for assigned employee
                    if ('department' in emp) {
                      department = emp.department || 'N/A';
                    }
                  } else {
                    // Handle job position from userRecord
                    if (typeof userRecord?.employee.job_position === 'string') {
                      jobTitle = userRecord.employee.job_position;
                    } else if (
                      userRecord?.employee.job_position &&
                      typeof userRecord.employee.job_position === 'object'
                    ) {
                      jobTitle = userRecord.employee.job_position.title || '';
                    }
                    // Handle department from userRecord
                    if (userRecord?.employee.location_assignment?.department_assign?.name) {
                      department = userRecord.employee.location_assignment.department_assign.name;
                    } else {
                      department = 'N/A';
                    }
                  }

                  return (
                    <TableRow key={empId}>
                      <TableCell>{empId}</TableCell>
                      <TableCell>{displayName}</TableCell>
                      <TableCell>{jobTitle}</TableCell>
                      <TableCell>{department}</TableCell>
                      <TableCell>
                        <select
                          className={`border rounded-md px-2 py-1 text-sm ${
                            !employeeProjectRoles[empId] ? 'border-red-500' : ''
                          }`}
                          value={employeeProjectRoles[empId] || ''}
                          onChange={(e) => {
                            handleRoleChange(empId, Number(e.target.value));
                            // Clear validation error when role is selected
                            if (e.target.value) {
                              setValidationErrors((prev) => {
                                const newErrors = { ...prev };
                                delete newErrors.employees;
                                return newErrors;
                              });
                            }
                          }}
                          disabled={isPending}
                        >
                          <option value="">Select Role</option>
                          {projectRoles?.map((role) => (
                            <option key={role.id} value={role.id}>
                              {role.name}
                            </option>
                          ))}
                        </select>
                        {!employeeProjectRoles[empId] && <p className="text-red-500 text-xs mt-1">Role is required</p>}
                      </TableCell>
                      <TableCell>
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => {
                            setSelectedEmployees((prev) => prev.filter((id) => id !== empId));
                            setTempSelectedEmployees((prev) => prev.filter((id) => id !== empId));
                            setEmployeeProjectRoles((prev) => {
                              const newRoles = { ...prev };
                              delete newRoles[empId];
                              return newRoles;
                            });
                            if (project.employees?.some((e) => e.id === empId)) {
                              setRemovedEmployees((prev) => [...prev, empId]);
                            }
                          }}
                          disabled={isPending}
                          title="Remove Employee"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            width="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-8 border-t border-gray-200">
        <Button
          type="button"
          onClick={onCancel}
          disabled={isLoading || isPending}
          className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 px-6 py-2 rounded-xl text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleUpdateProject}
          disabled={isLoading || isPending}
          className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-2 rounded-xl text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading || isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
