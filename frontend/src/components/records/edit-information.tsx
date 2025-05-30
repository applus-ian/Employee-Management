import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, KeyRound, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalInformation } from './personal-information';
import { ResidentialInformation } from './residential-information';
import { EmploymentInformation } from './employment-information';
import { DocumentationInformation } from './documentation-information';
import GovBankNumbers from './gov-bank-numbers';
import { useRecord } from '@/hooks/records/use-fetch-record';
import EmployeeProjects from './employee-projects/employee-projects';
import { EmploymentStatusHistory } from './employment-status-history';
import { useEmploymentStatusHistory } from '@/hooks/records/use-employment-status-history';

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'onboarding':
      return 'bg-blue-100 text-blue-700';
    case 'account creation':
      return 'bg-purple-100 text-purple-700';
    case 'active':
      return 'bg-green-100 text-green-700';
    case 'terminated':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const EditInformation = (data: { id: string }) => {
  // const [showProfileDialog, setShowProfileDialog] = useState(false);
  // const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  // const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('personal');
  // const [currentStatus, setCurrentStatus] = useState<string>('Active');
  // const [isLoadingStatus, setIsLoadingStatus] = useState(true);
  // const handleDelete = () => {
  //     if (employeeToDelete !== null) {
  //     console.log('Deleting employee with ID:', employeeToDelete);
  //     setShowDeleteDialog(false);
  //     setEmployeeToDelete(null);
  //     }
  // };

  const { data: record, isLoading, isError } = useRecord(data.id);
  const employeeId = record?.employee.id;
  const { data: history, isLoading: isLoadingStatus } = useEmploymentStatusHistory(employeeId || '');
  const latestStatus =
    history && history.length > 0
      ? [...history].sort((a, b) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const getTime = (entry: any) => {
            if (!entry.created_at) return 0;
            const safeDate = entry.created_at.includes(' ') ? entry.created_at.replace(' ', 'T') : entry.created_at;
            const t = new Date(safeDate).getTime();
            return isNaN(t) ? 0 : t;
          };
          return getTime(b) - getTime(a);
        })[0]
      : null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="ml-2 text-sm text-gray-500">Loading records...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        <AlertTriangle className="h-6 w-6 mr-2" />
        <span className="text-sm">Failed to load records.</span>
      </div>
    );
  }

  return (
    <>
      {' '}
      {/* Profile Header */}
      <div className="flex items-center gap-6">
        <Avatar className="w-24 h-24 ring-2 ring-orange-300 shadow-lg">
          <AvatarImage src="/applus-image1.png" alt="Profile" />
          <AvatarFallback>JJ</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{`${record?.employee.first_name} ${record?.employee.middle_name || ''} ${record?.employee.last_name} ${record?.employee.suffix || ''}`}</h2>
          <p className="mt-1 text-sm text-gray-500">
            Role:{' '}
            <span className="font-medium text-gray-800">{`${record?.roles.map((role) => role.name).join(', ') || 'No roles assigned'}`}</span>{' '}
            · Status:{' '}
            {isLoadingStatus ? (
              <span className="ml-1 inline-block px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                Loading...
              </span>
            ) : (
              <span
                className={`ml-1 inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(latestStatus?.status_set || '')}`}
              >
                {latestStatus?.status_set || 'No Status'}
              </span>
            )}
          </p>
        </div>

        <div className="ml-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-white text-[#EE7A2A] border-[#EE7A2A] border-2 w-fit flex items-center">
                <span className="hidden sm:inline">Reset Password</span>
                <KeyRound className="ml-2" />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader className="pb-5">
                <DialogTitle>Reset Password</DialogTitle>
              </DialogHeader>

              <form className="space-y-4"></form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex gap-4 mt-1 mb-2 pb-[-0px] rounded-none border-b w-full justify-center ">
          {[
            { value: 'personal', label: 'Personal Information' },
            { value: 'residential', label: 'Residential Information' },
            { value: 'govbank', label: 'Government & Banking' },
            { value: 'employmentskill', label: 'Employment & Skills' },
            { value: 'documents', label: 'Documents' },
            { value: 'projects', label: 'Projects' },
            { value: 'employmentstatushistory', label: 'Employment Status History' },
          ].map(({ value, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className={`pb-2 text-sm font-medium border-b-2 rounded-none transition-colors ${
                activeTab === value
                  ? 'text-orange-600 border-b-orange-600 data-[state=active]:bg-white rounded-none'
                  : 'text-gray-500 border-transparent hover:text-orange-500 hover:border-b-orange-500'
              }`}
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* PERSONAL INFORMATION */}
        <TabsContent value="personal">
          <PersonalInformation record={record} />
        </TabsContent>

        {/* RESIDENTIAL INFORMATION */}
        <TabsContent value="residential">
          <ResidentialInformation record={record} />
        </TabsContent>

        {/* GOVERNMENT & BANKING */}
        <TabsContent value="govbank">
          <GovBankNumbers record={record} />
        </TabsContent>

        {/* EMPLOYMENT & SKILLS */}
        <TabsContent value="employmentskill">
          <EmploymentInformation record={record} />
        </TabsContent>

        {/* DOCUMENTS */}
        <TabsContent value="documents">
          {record?.employee.id && <DocumentationInformation employeeId={record.employee.id} />}
        </TabsContent>

        {/* PROJECTS */}
        <TabsContent value="projects">
          {record?.employee.id && <EmployeeProjects employeeId={record.employee.id} />}
        </TabsContent>

        {/* EMPLOYMENT STATUS HISTORY */}
        <TabsContent value="employmentstatushistory">
          {record?.employee.id && <EmploymentStatusHistory employeeId={record.employee.id} />}
        </TabsContent>
      </Tabs>
    </>
  );
};
