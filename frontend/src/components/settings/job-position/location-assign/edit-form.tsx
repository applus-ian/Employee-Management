import { useState } from 'react';
import { DialogClose, DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EditLocationAssignFormProps {
  onCancel: () => void;
  onSave: (roleData: {
    job_positionName: string;
    country_assignName: string;
    office_assignName: string;
    team_assignName: string;
    department_assignName: string;
  }) => void;
}

export default function EditLocationAssignForm({ onCancel, onSave }: EditLocationAssignFormProps) {
  const [job_positionName, setJob_PositionName] = useState('');
  const [country_assignName, setCountry_AssignName] = useState('');
  const [office_assignName, setOffice_AssignName] = useState('');
  const [team_assignName, setTeam_AssignName] = useState('');
  const [department_assignName, setDepartment_AssignName] = useState('');

  const handleSave = () => {
    onSave({
      job_positionName,
      country_assignName,
      office_assignName,
      team_assignName,
      department_assignName,
    });
    onCancel();
  };

  return (
    <DialogContent className="w-full lg:!max-w-[35rem] h-fit flex flex-col bg-white">
      <DialogHeader>
        <DialogTitle>Create New Location Assignment</DialogTitle>
      </DialogHeader>

      <div className="p-5 space-y-4">
        {/* Two-column layout for 6 dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
          <div className="colspan-2">
            <Label htmlFor="title">
              <h3 className="text-black font-base">Job Position</h3>
            </Label>
            <Select value={job_positionName} onValueChange={(value) => setJob_PositionName(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Job Position..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Software_Developer">Software Developer</SelectItem>
                <SelectItem value="Solutions_Architect">Solutions Architect</SelectItem>
                <SelectItem value="Senior_Software_Developer">Senior Software Developer</SelectItem>
                <SelectItem value="Software_QA_Systems_Tester">Software QA Systems Tester</SelectItem>
                <SelectItem value="Software_QA_Automation_Tester">Software QA Automation Tester</SelectItem>
                <SelectItem value="System_Administrator">System Administrator</SelectItem>
                <SelectItem value="HR_Officer">HR Officer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="title">
              <h3 className="text-black font-base">Country Assign</h3>
            </Label>
            <Select value={country_assignName} onValueChange={(value) => setCountry_AssignName(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Assign a country..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="australia">Australia</SelectItem>
                <SelectItem value="spain">Spain</SelectItem>
                <SelectItem value="malaysia">Malaysia</SelectItem>
                <SelectItem value="philippines">Philippines</SelectItem>
                <SelectItem value="indonesia">Indonesia</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="japan">Japan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="title">
              <h3 className="text-black font-base">Office Assign</h3>
            </Label>
            <Select value={office_assignName} onValueChange={(value) => setOffice_AssignName(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Assign an office..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ayala_cebu_tower_1_office">Ayala Cebu Tower 1 Office</SelectItem>
                <SelectItem value="Subangdaku Mandaue Office">Subangdaku Mandaue Office</SelectItem>
                <SelectItem value="Basak Mandaue Office">Basak Mandaue Office</SelectItem>
                <SelectItem value="Barili Office">Barili Office</SelectItem>
                <SelectItem value="Talisay Office">Talisay Office</SelectItem>
                <SelectItem value="Moalboal Office">Moalboal Office</SelectItem>
                <SelectItem value="Bantayan Office">Bantayan Office</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="title">
              <h3 className="text-black font-base">Team Assign</h3>
            </Label>
            <Select value={team_assignName} onValueChange={(value) => setTeam_AssignName(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Assign a team..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Employee Management Team">Employee Management Team</SelectItem>
                <SelectItem value="Attendance Team">Attendance Team</SelectItem>
                <SelectItem value="Recruitment Team">Recruitment Team</SelectItem>
                <SelectItem value="Onboarding Team">Onboarding Team</SelectItem>
                <SelectItem value="HR Team">HR Team</SelectItem>
                <SelectItem value="Admin Team">Admin Team</SelectItem>
                <SelectItem value="Joshua Team">Joshua Team</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="title">
              <h3 className="text-black font-base">Department Assign</h3>
            </Label>
            <Select value={department_assignName} onValueChange={(value) => setDepartment_AssignName(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Assign a department..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Information Technology">Information Technology</SelectItem>
                <SelectItem value="Finance ">Finance </SelectItem>
                <SelectItem value="Human Resource">Human Resource</SelectItem>
                <SelectItem value="IT Support">IT Support</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Backend">Backend</SelectItem>
                <SelectItem value="DevOps">DevOps</SelectItem>
                <SelectItem value="Flower">Flower</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-5 flex justify-center gap-x-6">
          <DialogClose asChild>
            <Button className="bg-[#EE7A2A] text-white w-[10rem]" onClick={handleSave}>
              Save Changes
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]" onClick={onCancel}>
              Cancel
            </Button>
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  );
}
