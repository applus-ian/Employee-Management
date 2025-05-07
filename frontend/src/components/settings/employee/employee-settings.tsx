import { useState } from 'react';
import RolePermission from './role-permission/role-permission';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import NewRoleForm from './role-permission/create-form';
import { CirclePlus, TextSearch } from 'lucide-react';
import NewSkillForm from './skills/create-form';

const navLinks = [
  { name: 'Roles & Permissions', href: 'Roles' },
  { name: 'Skills', href: 'Skills' },
  { name: 'Documents', href: 'Documents' },
] as const;

type TabKey = (typeof navLinks)[number]['href'];

export default function EmployeeRolePage() {
  const [activeTab, setactiveTab] = useState<TabKey>('Roles');

  // Placeholder functions for onCancel and onSave
  const handleCancel = () => {
    console.log('Cancelled');
  };

  const handleSave = () => {
    console.log('Saved');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#454D5A]">
        Employee {activeTab === 'Roles' ? 'Roles and Permissions' : activeTab} Settings
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
          {activeTab === 'Skills' && (
            <Dialog>
              <DialogTrigger asChild>
                <button className="px-2 py-1 bg-[#EE7A2A] hover:bg-[#FFA161] text-white rounded-md text-xs font-medium">
                  <span className="flex items-center gap-1">
                    View Skill Category
                    <TextSearch size={18} strokeWidth={2} />
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Skills Dialog</DialogTitle>
                </DialogHeader>
                <div>
                  <p>This is a dialog specifically for the Skills tab.</p>
                </div>
              </DialogContent>
            </Dialog>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-2 py-1 text-[#EE7A2A] font-medium text-xs rounded-md hover:bg-[#FFA161] hover:text-white border border-[#EE7A2A] size-fit">
                <span className="flex items-center gap-1">
                  Add New {activeTab.slice(0, -1)}
                  <CirclePlus size={18} strokeWidth={2} />
                </span>
              </button>
            </DialogTrigger>
            <div>
              {activeTab === 'Roles' && <NewRoleForm onCancel={handleCancel} onSave={handleSave} />}
              {activeTab === 'Skills' && <NewSkillForm onCancel={handleCancel} onSave={handleSave} />}
              {/* {activeTab === 'Documents' && (
                
              )} */}
            </div>
          </Dialog>
        </div>
      </nav>

      {activeTab === 'Roles' && <RolePermission />}
      {/* {activeTab === 'Skills' && <EmployeeRolePage />}
      {activeTab === 'Documents' && <JobPositionPage />} */}
    </div>
  );
}
