import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { UserSchema } from '@/schemas';
import { useEmployeeSkills } from '@/hooks/records/use-fetch-employee-skills';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface Props {
  record?: UserSchema;
}

export function EmploymentInformation({ record }: Props) {
  if (!record?.employee.id) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        <AlertTriangle className="h-6 w-6 mr-2" />
        <span className="text-sm">Failed to load records.</span>
      </div>
    );
  }

  const { data: employee_skills = [], isLoading, isError } = useEmployeeSkills(record.employee.id);

  return (
    <Card className="rounded-xl border shadow-sm">
      {/* Employment Details ------------------------------------------------*/}
      <CardHeader>
        <h3 className="text-xl font-semibold text-gray-900">💼 Employment Details</h3>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm text-gray-800">
        <div>
          <p className="text-gray-500">Job Position</p>
          <p className="font-medium">{record?.employee.job_position.title}</p>
        </div>
        <div>
          <p className="text-gray-500">Department</p>
          <p className="font-medium">{record?.employee.location_assignment.department_assign?.name}</p>
        </div>
        <div>
          <p className="text-gray-500">Date Hired</p>
          <p className="font-medium">{record?.employee.date_hired}</p>
        </div>
        <div>
          <p className="text-gray-500">Employment</p>
          <p className="font-medium">{record?.employee.employment_type.name}</p>
        </div>
      </CardContent>

      {/* Employee Skills ----------------------------------------------------*/}
      <CardHeader>
        <h3 className="text-xl font-semibold text-gray-900">🛠️ Employee Skills</h3>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
            <span className="ml-2 text-sm text-gray-500">Loading employee skills...</span>
          </div>
        )}
        {isError && (
          <div className="flex items-center justify-center h-40 text-red-500">
            <AlertTriangle className="h-6 w-6 mr-2" />
            <span className="text-sm">Failed to load employee skills.</span>
          </div>
        )}

        {!isLoading && !isError && (
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Skill Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Years of Experience</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employee_skills?.map((skill) => (
                  <TableRow key={skill.skill.id} className="hover:bg-gray-50">
                    <TableCell>{skill.skill.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{skill.skill.description}</TableCell>
                    <TableCell>{skill.skill.skill_category.name}</TableCell>
                    <TableCell className="text-center">{skill.years_of_experience}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {employee_skills.length === 0 && (
              <p className="mt-4 text-sm text-gray-500">No skills found for this employee.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
