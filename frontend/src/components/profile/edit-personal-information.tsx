import { FilePenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { AuthContext } from '@/context/AuthContext';
import { useContext, useState } from 'react';

export default function EditPersonalInformation() {
  const authContext = useContext(AuthContext);

  const employee = authContext.user?.employee;

  // Set up initial state and prefill it with the data from AuthContext
  const [firstName, setFirstName] = useState(employee?.first_name || '');
  const [middleName, setMiddleName] = useState(employee?.middle_name || '');
  const [lastName, setLastName] = useState(employee?.last_name || '');
  const [suffix, setSuffix] = useState(employee?.suffix || '');
  const [email, setEmail] = useState(employee?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(employee?.phone_number || '');
  const [emergencyContact1, setEmergencyContact1] = useState(employee?.emergency_contact1 || '');
  const [emergencyContact2, setEmergencyContact2] = useState(employee?.emergency_contact2 || '');
  const [gender, setGender] = useState(employee?.gender || '');
  const [birthDate, setBirthDate] = useState(employee?.birthdate ?? '');
  const [civilStatus, setCivilStatus] = useState(employee?.civil_status ?? '');
  const [nationality, setNationality] = useState(employee?.nationality ?? '');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="order-2">
          <FilePenLine size={22} strokeWidth={2} className="text-[#EE7A2A]" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-full lg:!max-w-[60rem] lg:h-fit md:h-[90vh] sm:h-[90vh] h-[90vh] flex flex-col">
        <DialogHeader className="shrink-0 pb-4">
          <DialogTitle>Edit Personal Information</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto lg:flex-0 lg:px-0 md:flex-1 md:px-5 sm:flex-1 sm:px-5">
          <form action="" method="post">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
              {/* First Name */}
              <div className="flex flex-col p-5">
                <div>
                  <label>
                    <h3 className="text-gray-600">First Name</h3>
                  </label>
                </div>
                <div>
                  <Input
                    type="text"
                    className="mt-1 p-1 pl-3 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              {/* Middle Name */}
              <div className="flex flex-col p-5">
                <label>
                  <h3 className="text-gray-600">Middle Name</h3>
                </label>
                <div>
                  <Input
                    type="text"
                    className="mt-1 p-1 pl-3 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </div>
              </div>
              {/* Last Name */}
              <div className="flex flex-col p-5">
                <label>
                  <h3 className="text-gray-600">Last Name</h3>
                </label>
                <div>
                  <Input
                    type="text"
                    className="mt-1 p-1 pl-3 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              {/* Suffix */}
              <div className="flex flex-col p-5">
                <label>
                  <h3 className="text-gray-600">Suffix</h3>
                </label>
                <div>
                  <Input
                    type="text"
                    className="mt-1 p-1 pl-3 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={suffix}
                    onChange={(e) => setSuffix(e.target.value)}
                  />
                </div>
              </div>
              {/* Email */}
              <div className="flex flex-col p-5">
                <label>
                  <h3 className="text-gray-600">Email Adress</h3>
                </label>
                <div>
                  <Input
                    type="text"
                    className="mt-1 p-1 pl-3 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              {/* Phone Number */}
              <div className="flex flex-col p-5">
                <label>
                  <h3 className="text-gray-600">Phone no.</h3>
                </label>
                <div>
                  <Input
                    type="text"
                    className="mt-1 p-1 pl-3 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              {/* Emergency Contact 1 */}
              <div className="flex flex-col p-5">
                <label>
                  <h3 className="text-gray-600">Emergency Contact 1</h3>
                </label>
                <div>
                  <Input
                    type="text"
                    className="mt-1 p-1 pl-3 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={emergencyContact1}
                    onChange={(e) => setEmergencyContact1(e.target.value)}
                  />
                </div>
              </div>
              {/* Emergency Contact 2 */}
              <div className="flex flex-col p-5">
                <label>
                  <h3 className="text-gray-600">Emergency Contact 2</h3>
                </label>
                <div>
                  <Input
                    type="text"
                    className="mt-1 p-1 pl-3 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={emergencyContact2}
                    onChange={(e) => setEmergencyContact2(e.target.value)}
                  />
                </div>
              </div>
              {/* Gender */}
              <div className="flex flex-col p-5">
                <label>
                  <span className="text-gray-600 font-medium">Gender</span>
                </label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-100">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Date of Birth */}
              <div className="flex flex-col p-5">
                <label>
                  <span className="text-gray-600 font-medium">Date of Birth</span>
                </label>
                <Input
                  type="date"
                  className="mt-1 p-1 pl-3 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>

              {/* Civil Status */}
              <div className="flex flex-col p-5">
                <label>
                  <span className="text-gray-600 font-medium">Civil Status</span>
                </label>
                <Select value={civilStatus} onValueChange={setCivilStatus}>
                  <SelectTrigger className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-100">
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Nationality */}
              <div className="flex flex-col p-5">
                <label>
                  <h3 className="text-gray-600">Nationality</h3>
                </label>
                <div>
                  <Input
                    type="text"
                    className="mt-1 p-1 pl-3 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="px-5 pt-5 flex justify-center gap-x-6">
              <Button className="bg-[#EE7A2A] text-white w-[10rem]">Save Changes</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
