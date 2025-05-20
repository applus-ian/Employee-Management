'use client';

import { useProjects } from '@/hooks/projects/use-fetch-projects';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Project } from '@/types/projects/project';

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { AlertTriangle, Loader2 } from 'lucide-react';
import '@pathofdev/react-tag-Input/build/index.css';
// import { CreateProject } from '@/types/projects/project';

export default function EmployeeProjects() {
  // const [isDialogOpen, setDialogOpen] = useState(false);

  // const handleCancel = () => {
  //   console.log('Cancelled');
  //   setDialogOpen(false);
  // };

  // const handleProjectSave = (data: CreateProject) => {
  //   console.log(data);
  //   alert(`Project successfully created!`);
  //   setDialogOpen(false);
  // };

  const { data, isLoading, isError } = useProjects();

  const rows: Project[] =
    data?.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      start_date: item.start_date,
      end_date: item.end_date,
      employees:
        item.employees?.map((employee) => ({
          id: employee.id,
          profile: employee.profile || null,
          full_name: employee.full_name,
          job_position: employee.job_position,
          department: employee.department,
          project_role_id: employee.project_role_id,
        })) ?? [],
    })) ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="ml-2 text-sm text-gray-500">Loading projects...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        <AlertTriangle className="h-6 w-6 mr-2" />
        <span className="text-sm">Failed to load projects.</span>
      </div>
    );
  }
  // if (isError && error) {
  //   const err = error as Error;
  //   return <p>Error loading projects: {err.message}</p>;
  // }

  return (
    <div>
      {/* Header Section */}
      <div className="space-y-5">
        <h2 className="text-lg font-semibold text-gray-800">Projects</h2>

        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Filters - Left Side */}
          <div className="flex gap-2 flex-wrap">
            <Select>
              <SelectTrigger className="ml-2 px-3 py-1 rounded-md bg-white text-sm flex items-center gap-2">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_department">All Departments</SelectItem>
                <SelectItem value="it">IT</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="ml-2 px-3 py-1 rounded-md bg-white text-sm flex items-center gap-2">
                <SelectValue placeholder="All Positions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="allposition">All Positions</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="recruiter">Recruiter</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="ml-2 px-3 py-1 rounded-md bg-white text-sm flex items-center gap-2">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_status">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div>
        <DataTable columns={columns} data={rows} />
      </div>
    </div>
  );
}
