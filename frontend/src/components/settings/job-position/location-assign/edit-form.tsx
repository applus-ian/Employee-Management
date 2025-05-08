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
    <DialogContent className="w-full lg:!max-w-[45rem] h-fit max-h-[35rem] flex flex-col bg-white overflow-y-auto rounded-m">
      <DialogHeader>
        <DialogTitle>Create Edit Location Assignment</DialogTitle>
      </DialogHeader>
      <div>
        <form>
          <div className="grid lg:grid-cols-2 md:grid-cols-1 py-4 p-3 max-h-80 gap-4">
            <div className="flex flex-col py-2 p-3 col-span-2 w-full">
              <div>
                <Label>
                  <h3 className="text-black font-base">Job Position</h3>
                </Label>
              </div>
              <div>
                <Select value={job_positionName} onValueChange={(value) => setJob_PositionName(value)}>
                  <SelectTrigger className="mt-2 px-4 py-2 pl-3 w-full border rounded-xl border-gray-500 focus:border-[#EE7A2A]">
                    <SelectValue placeholder="Choose Category" className="text-gray-500" />
                  </SelectTrigger>
                  <SelectContent className="border rounded-xl border-gray-500 bg-white">
                    <SelectItem value="Software Developer" className="hover:bg-gray-300 text-black">
                      Software Developer
                    </SelectItem>{' '}
                    <SelectItem value="Solutions Architect" className="hover:bg-gray-300 text-black">
                      Solutions Architect
                    </SelectItem>{' '}
                    <SelectItem value="Senior Software Developer" className="hover:bg-gray-300 text-black">
                      Senior Software Developer
                    </SelectItem>{' '}
                    <SelectItem value="Software QA Systems Tester" className="hover:bg-gray-300 text-black">
                      Software QA Systems Tester
                    </SelectItem>{' '}
                    <SelectItem value="Software QA Automation Tester" className="hover:bg-gray-300 text-black">
                      Software QA Automation Tester
                    </SelectItem>{' '}
                    <SelectItem value="System Administrator" className="hover:bg-gray-300 text-black">
                      System Administrator
                    </SelectItem>{' '}
                    <SelectItem value="HR Officer" className="hover:bg-gray-300 text-black">
                      HR Officer
                    </SelectItem>{' '}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col py-2 p-3">
              <div>
                <Label>
                  <h3 className="text-black font-base">Country Assign</h3>
                </Label>
              </div>
              <div>
                <Select value={country_assignName} onValueChange={(value) => setCountry_AssignName(value)}>
                  <SelectTrigger className="mt-2 px-4 py-2 pl-3 w-full border rounded-xl border-gray-500 focus:border-[#EE7A2A]">
                    <SelectValue placeholder="Choose Category" className="text-gray-500" />
                  </SelectTrigger>
                  <SelectContent className="border rounded-xl border-gray-500 bg-white">
                    <SelectItem value="Australia" className="hover:bg-gray-300 text-black">
                      Australia
                    </SelectItem>{' '}
                    <SelectItem value="Spain" className="hover:bg-gray-300 text-black">
                      Spain
                    </SelectItem>{' '}
                    <SelectItem value="Malaysia" className="hover:bg-gray-300 text-black">
                      Malaysia
                    </SelectItem>{' '}
                    <SelectItem value="Philippines" className="hover:bg-gray-300 text-black">
                      Philippines
                    </SelectItem>{' '}
                    <SelectItem value="Indonesia" className="hover:bg-gray-300 text-black">
                      Indonesia
                    </SelectItem>{' '}
                    <SelectItem value="Canada" className="hover:bg-gray-300 text-black">
                      Canada
                    </SelectItem>{' '}
                    <SelectItem value="Japan" className="hover:bg-gray-300 text-black">
                      Japan
                    </SelectItem>{' '}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col py-2 p-3">
              <div>
                <Label>
                  <h3 className="text-black font-base">Office Assign</h3>
                </Label>
              </div>
              <div>
                <Select value={office_assignName} onValueChange={(value) => setOffice_AssignName(value)}>
                  <SelectTrigger className="mt-2 px-4 py-2 pl-3 w-full border rounded-xl border-gray-500 focus:border-[#EE7A2A]">
                    <SelectValue placeholder="Choose Category" className="text-gray-500" />
                  </SelectTrigger>
                  <SelectContent className="border rounded-xl border-gray-500 bg-white">
                    <SelectItem value="Ayala Cebu Tower 1 Office" className="hover:bg-gray-300 text-black">
                      Ayala Cebu Tower 1 Office
                    </SelectItem>{' '}
                    <SelectItem value="Subangdaku Mandaue Office" className="hover:bg-gray-300 text-black">
                      Subangdaku Mandaue Office
                    </SelectItem>{' '}
                    <SelectItem value="Basak Mandaue Office" className="hover:bg-gray-300 text-black">
                      Basak Mandaue Office
                    </SelectItem>{' '}
                    <SelectItem value="Barili Office" className="hover:bg-gray-300 text-black">
                      Barili Office
                    </SelectItem>{' '}
                    <SelectItem value="Talisay Office" className="hover:bg-gray-300 text-black">
                      Talisay Office
                    </SelectItem>{' '}
                    <SelectItem value="Moalboal Office" className="hover:bg-gray-300 text-black">
                      Moalboal Office
                    </SelectItem>{' '}
                    <SelectItem value="Bantayan Office" className="hover:bg-gray-300 text-black">
                      Bantayan Office
                    </SelectItem>{' '}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col py-2 p-3">
              <div>
                <Label>
                  <h3 className="text-black font-base">Team Assign</h3>
                </Label>
              </div>
              <div>
                <Select value={team_assignName} onValueChange={(value) => setTeam_AssignName(value)}>
                  <SelectTrigger className="mt-2 px-4 py-2 pl-3 w-full border rounded-xl border-gray-500 focus:border-[#EE7A2A]">
                    <SelectValue placeholder="Choose Category" className="text-gray-500" />
                  </SelectTrigger>
                  <SelectContent className="border rounded-xl border-gray-500 bg-white">
                    <SelectItem value="Employee Management Team" className="hover:bg-gray-300 text-black">
                      Employee Management Team
                    </SelectItem>{' '}
                    <SelectItem value="Attendance Team" className="hover:bg-gray-300 text-black">
                      Attendance Team
                    </SelectItem>{' '}
                    <SelectItem value="Recruitment Team" className="hover:bg-gray-300 text-black">
                      Recruitment Team
                    </SelectItem>{' '}
                    <SelectItem value="Onboarding Team" className="hover:bg-gray-300 text-black">
                      Onboarding Team
                    </SelectItem>{' '}
                    <SelectItem value="HR Team" className="hover:bg-gray-300 text-black">
                      HR Team
                    </SelectItem>{' '}
                    <SelectItem value="Admin Team" className="hover:bg-gray-300 text-black">
                      Admin Team
                    </SelectItem>{' '}
                    <SelectItem value="Joshua Team" className="hover:bg-gray-300 text-black">
                      Joshua Team
                    </SelectItem>{' '}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col py-2 p-3">
              <div>
                <Label>
                  <h3 className="text-black font-base">Department Assign</h3>
                </Label>
              </div>
              <div>
                <Select value={department_assignName} onValueChange={(value) => setDepartment_AssignName(value)}>
                  <SelectTrigger className="mt-2 px-4 py-2 pl-3 w-full border rounded-xl border-gray-500 focus:border-[#EE7A2A]">
                    <SelectValue placeholder="Choose Category" className="text-gray-500" />
                  </SelectTrigger>
                  <SelectContent className="border rounded-xl border-gray-500 bg-white">
                    <SelectItem value="Information Technology" className="hover:bg-gray-300 text-black">
                      Information Technology
                    </SelectItem>{' '}
                    <SelectItem value="Finance" className="hover:bg-gray-300 text-black">
                      Finance
                    </SelectItem>{' '}
                    <SelectItem value="Human Resource" className="hover:bg-gray-300 text-black">
                      Human Resource
                    </SelectItem>{' '}
                    <SelectItem value="IT Support" className="hover:bg-gray-300 text-black">
                      IT Support
                    </SelectItem>{' '}
                    <SelectItem value="Engineering" className="hover:bg-gray-300 text-black">
                      Engineering
                    </SelectItem>{' '}
                    <SelectItem value="Backend" className="hover:bg-gray-300 text-black">
                      Backend
                    </SelectItem>{' '}
                    <SelectItem value="DevOps" className="hover:bg-gray-300 text-black">
                      DevOps
                    </SelectItem>{' '}
                    <SelectItem value="Flower" className="hover:bg-gray-300 text-black">
                      Flower
                    </SelectItem>{' '}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className=" px-5 pt-5 flex justify-center gap-x-6">
            <DialogClose asChild>
              <Button className="bg-[#EE7A2A] text-white w-[10rem]" onClick={handleSave}>
                Confirm
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]" onClick={onCancel}>
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
