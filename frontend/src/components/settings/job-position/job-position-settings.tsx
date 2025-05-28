import { useState } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { CirclePlus } from 'lucide-react';
import NewJobPositionForm from './job-position/create-form';
import JobPosition from './job-position/job-position';
import NewLocationAssignForm from './location-assignment/create-form';
import LocationAssignments from './location-assignment/location-assignment';
import CountryAssigns from './country-assigns/country-assigns';
import NewCountryAssignForm from './country-assigns/create-form';
import OfficeAssigns from './office-assigns/office-assigns';
import NewOfficeAssignForm from './office-assigns/create-form';
import TeamAssigns from './team-assign/team-assign';
import NewTeamAssignForm from './team-assign/create-form';
import DepartmentAssigns from './department-assign/department-assign';
import NewDepartmentAssignForm from './department-assign/create-form';

const navLinks = [
  { name: 'Job Position', href: 'Job Positions' },
  { name: 'Location Assignment', href: 'Location Assignments' },
  { name: 'Country Assign', href: 'Country Assigns' },
  { name: 'Office Assign', href: 'Office Assigns' },
  { name: 'Team Assign', href: 'Team Assigns' },
  { name: 'Department Assign', href: 'Department Assigns' },
] as const;

type TabKey = (typeof navLinks)[number]['href'];

export default function JobPositionPage() {
  const [activeTab, setactiveTab] = useState<TabKey>('Job Positions');
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const handleSave = () => {
    setDialogOpen(false);
    console.log('Saved');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#454D5A]">
        Job Position {activeTab === 'Job Positions' ? '' : `- ${activeTab.slice(0, -1)}`} Settings
      </h2>

      {/* Nav */}
      <nav className="flex justify-between items-center w-full my-4">
        <ul className="flex">
          {navLinks.map((link) => {
            const isActive = activeTab === link.href;
            return (
              <li key={link.name} className="flex items-center justify-center pr-3">
                <button
                  onClick={() => setactiveTab(link.href)}
                  className={cn(
                    'inline-block items-center transition-colors font-medium text-xs px-2 py-1 text-[#344054] hover:text-[#EE7A2A] border rounded-md border-[#7E8899]',
                    isActive && 'text-black border-b-2 border-[#EE7A2A] bg-[#FFB582]',
                  )}
                >
                  {link.name}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button className="px-2 py-1 text-[#EE7A2A] font-medium text-xs rounded-md hover:bg-[#FFA161] hover:text-white border border-[#EE7A2A] size-fit">
                <span className="flex items-center gap-1">
                  Add New {activeTab.slice(0, -1)}
                  <CirclePlus size={18} strokeWidth={2} />
                </span>
              </button>
            </DialogTrigger>
            <div>
              {activeTab === 'Job Positions' && <NewJobPositionForm onCancel={handleCancel} onSave={handleSave} />}
              {activeTab === 'Location Assignments' && (
                <NewLocationAssignForm onCancel={handleCancel} onSave={handleSave} />
              )}
              {activeTab === 'Country Assigns' && <NewCountryAssignForm onCancel={handleCancel} onSave={handleSave} />}
              {activeTab === 'Office Assigns' && <NewOfficeAssignForm onCancel={handleCancel} onSave={handleSave} />}
              {activeTab === 'Team Assigns' && <NewTeamAssignForm onCancel={handleCancel} onSave={handleSave} />}
              {activeTab === 'Department Assigns' && (
                <NewDepartmentAssignForm onCancel={handleCancel} onSave={handleSave} />
              )}
            </div>
          </Dialog>
        </div>
      </nav>

      {activeTab === 'Job Positions' && <JobPosition />}
      {activeTab === 'Location Assignments' && <LocationAssignments />}
      {activeTab === 'Country Assigns' && <CountryAssigns />}
      {activeTab === 'Office Assigns' && <OfficeAssigns />}
      {activeTab === 'Team Assigns' && <TeamAssigns />}
      {activeTab === 'Department Assigns' && <DepartmentAssigns />}
    </div>
  );
}
