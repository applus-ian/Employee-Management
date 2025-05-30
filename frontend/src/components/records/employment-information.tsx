import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { UserSchema } from '@/schemas';
import { useEmployeeSkills } from '@/hooks/records/use-fetch-employee-skills';
import { AlertTriangle, Loader2, FilePenLine, Plus, Trash2, Edit } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { EditEmploymentInformation } from './edit-employment-information';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SkillDialog, TemporarySkill } from './skill-dialog';
import { useState } from 'react';
import { useUpdateRecord } from '@/hooks/records/use-update-record';
import { EmployeeSkill } from '@/schemas';

interface Props {
  record?: UserSchema;
}

export function EmploymentInformation({ record }: Props) {
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [isEditingSkill, setIsEditingSkill] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<EmployeeSkill | null>(null);
  const { mutate: updateRecord, isPending } = useUpdateRecord();

  if (!record?.employee.id) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        <AlertTriangle className="h-6 w-6 mr-2" />
        <span className="text-sm">Failed to load records.</span>
      </div>
    );
  }

  const { data: employee_skills = [], isLoading, isError, error } = useEmployeeSkills(record.employee.id);

  // Log any errors for debugging
  if (isError) {
    console.error('Error loading employee skills:', error);
  }

  const handleSkillAdd = (skill: TemporarySkill) => {
    const formData = new FormData();
    formData.append('id', record.employee.id);
    formData.append('skills', JSON.stringify([skill.skill_id]));

    updateRecord(formData, {
      onSuccess: () => {
        setIsAddingSkill(false);
      },
    });
  };

  const handleSkillEdit = (skill: EmployeeSkill) => {
    setSelectedSkill(skill);
    setIsEditingSkill(true);
  };

  const handleSkillDelete = (employeeId: string) => {
    const updatedSkills = employee_skills.filter((s) => s.employee_id !== employeeId);
    const formData = new FormData();
    formData.append('id', record.employee.id);
    formData.append('skills', JSON.stringify(updatedSkills.map((s) => s.skill.id)));

    updateRecord(formData, {
      onSuccess: () => {
        setIsEditingSkill(false);
        setSelectedSkill(null);
      },
    });
  };

  const handleSaveChanges = () => {
    // This will be handled by individual add/edit/delete operations
    setIsAddingSkill(false);
    setIsEditingSkill(false);
    setSelectedSkill(null);
  };

  return (
    <Card className="rounded-xl border shadow-sm">
      {/* Employment Details ------------------------------------------------*/}
      <CardHeader>
        <div className="flex justify-between">
          <div className="order-1">
            <h3 className="text-xl font-semibold text-gray-900">💼 Employment Details</h3>
          </div>
          {record && (
            <Dialog>
              <DialogTrigger asChild>
                <button className="order-2" aria-label="Edit Employment Info">
                  <FilePenLine size={22} strokeWidth={2} className="text-[#EE7A2A]" />
                </button>
              </DialogTrigger>
              <DialogContent className="w-full lg:!max-w-[60rem] h-[90vh] flex flex-col">
                <DialogHeader className="shrink-0 pb-4">
                  <DialogTitle>Edit Employment Information</DialogTitle>
                </DialogHeader>
                <EditEmploymentInformation user_id={record.id} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm text-gray-800">
        <div>
          <p className="text-gray-500">Job Position</p>
          <p className="font-medium">{record?.employee.job_position.title}</p>
        </div>
        <div>
          <p className="text-gray-500">Department</p>
          <p className="font-medium">
            {record?.employee.location_assignment?.department_assign?.name || 'Not yet assigned.'}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Country</p>
          <p className="font-medium">
            {record?.employee.location_assignment?.country_assign?.name || 'Not yet assigned.'}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Office</p>
          <p className="font-medium">
            {record?.employee.location_assignment?.office_assign?.name || 'Not yet assigned.'}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Team</p>
          <p className="font-medium">
            {record?.employee.location_assignment?.team_assign?.name || 'Not yet assigned.'}
          </p>
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
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">🛠️ Employee Skills</h3>
          <div className="flex gap-2">
            <Button className="bg-[#EE7A2A] hover:bg-[#FFA161] text-white" onClick={() => setIsAddingSkill(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
            <Button
              className="bg-[#EE7A2A] hover:bg-[#FFA161] text-white"
              onClick={handleSaveChanges}
              disabled={isPending}
            >
              {isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
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
            <span className="text-sm">Failed to load employee skills. Please check your permissions.</span>
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
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employee_skills?.map((skill) => (
                  <TableRow key={skill.skill.id} className="hover:bg-gray-50">
                    <TableCell>{skill.skill.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{skill.skill.description}</TableCell>
                    <TableCell>{skill.skill.skill_category.name}</TableCell>
                    <TableCell className="text-center">{skill.years_of_experience}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleSkillEdit(skill)} className="text-blue-500 hover:text-blue-700">
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleSkillDelete(skill.employee_id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </TableCell>
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

      {/* Add Skill Dialog */}
      <SkillDialog open={isAddingSkill} onOpenChange={setIsAddingSkill} onSkillAdd={handleSkillAdd} />

      {/* Edit Skill Dialog */}
      <SkillDialog
        open={isEditingSkill}
        onOpenChange={setIsEditingSkill}
        onSkillAdd={(updatedSkill) => {
          handleSkillAdd(updatedSkill);
          setIsEditingSkill(false);
        }}
        initialSkill={selectedSkill}
      />
    </Card>
  );
}
