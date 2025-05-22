'use client';

import { useState } from 'react';
import RolePermission from './role-permissions/role-permission';
import Skills from './skills/skills';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import NewRoleForm from './role-permissions/create-form';
import { CirclePlus, TextSearch } from 'lucide-react';
import NewSkillForm from './skills/create-form';
import Skill_Categories from './skills/skill-categories/skill-categories';
import NewDocumentForm from './document-types/create-form';
import DocumentTypes from './document-types/document-types';
import ProjectRoles from './project-roles/project-roles';
import NewProjectRoleForm from './project-roles/create-form';
import EmploymentTypes from './employment-type/employment-type';
import NewEmploymentTypeForm from './employment-type/create-form';
import NewSkillCategoryForm from './skills/skill-categories/create-form';

const navLinks = [
  { name: 'Roles & Permissions', href: 'Roles' },
  { name: 'Skills', href: 'Skills' },
  { name: 'Document Types', href: 'Document_Types' },
  { name: 'Project Roles', href: 'Project Roles' },
  { name: 'Employment Types', href: 'Employment Types' },
] as const;

type TabKey = (typeof navLinks)[number]['href'];

export default function EmployeeRolePage() {
  const [activeTab, setActiveTab] = useState<TabKey>('Roles');

  // Dialog control state
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSkillCatOpen, setSkillCatOpen] = useState(false);
  const [isSkillCatNewOpen, setSkillCatNewOpen] = useState(false);

  const handleCancel = () => {
    setDialogOpen(false); // Close the dialog
  };

  const handleDocumentTypeSave = (data: { name: string }) => {
    alert(`Document Type "${data.name}" created!`);
    setDialogOpen(false); // Close dialog after save
  };

  function handleSkillCategorySave(data: { name: string }): void {
    alert(`Skill Category "${data.name}" created!`);
    setSkillCatNewOpen(false); // Close dialog after save
  }

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
                  onClick={() => setActiveTab(link.href)}
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
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Title - Left Side */}
              <div className="flex gap-2 flex-wrap">
                <Dialog open={isSkillCatOpen} onOpenChange={setSkillCatOpen}>
                  <DialogTrigger asChild>
                    <button className="px-2 py-1 bg-[#EE7A2A] hover:bg-[#FFA161] text-white rounded-md text-xs font-medium">
                      <span className="flex items-center gap-1">
                        View Skill Category
                        <TextSearch size={18} strokeWidth={2} />
                      </span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="w-full lg:!max-w-[45rem] h-fit flex flex-col bg-white">
                    <DialogHeader>
                      <div className="flex justify-between items-center w-full">
                        <DialogTitle>Skill Categories</DialogTitle>
                        {/* Add Skill Category Button - Right Side */}
                        <Dialog open={isSkillCatNewOpen} onOpenChange={setSkillCatNewOpen}>
                          <DialogTrigger asChild>
                            <button className="mt-5 px-2 py-1 text-[#EE7A2A] font-medium text-xs rounded-md hover:bg-[#FFA161] hover:text-white border border-[#EE7A2A]">
                              <span className="flex items-center gap-1">
                                Add New Skill Category
                                <CirclePlus size={18} strokeWidth={2} />
                              </span>
                            </button>
                          </DialogTrigger>
                          <DialogContent className="w-full lg:!max-w-[30%] h-fit flex flex-col bg-white">
                            <DialogHeader>
                              <DialogTitle>Create New Skill Category</DialogTitle>
                            </DialogHeader>
                            <NewSkillCategoryForm onCancel={handleCancel} onSave={handleSkillCategorySave} />
                          </DialogContent>
                        </Dialog>
                      </div>
                    </DialogHeader>
                    <Skill_Categories />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}

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
              {activeTab === 'Roles' && <NewRoleForm onCancel={handleCancel} onSave={() => console.log('Save role')} />}
              {activeTab === 'Skills' && (
                <NewSkillForm onCancel={handleCancel} onSave={() => console.log('Save skill')} />
              )}
              {activeTab === 'Document_Types' && (
                <NewDocumentForm onCancel={handleCancel} onSave={handleDocumentTypeSave} />
              )}
              {activeTab === 'Project Roles' && (
                <NewProjectRoleForm onCancel={handleCancel} onSave={() => console.log('Save project role')} />
              )}
              {activeTab === 'Employment Types' && (
                <NewEmploymentTypeForm onCancel={handleCancel} onSave={() => console.log('Save employment type')} />
              )}
            </div>
          </Dialog>
        </div>
      </nav>

      {activeTab === 'Roles' && <RolePermission />}
      {activeTab === 'Skills' && <Skills />}
      {activeTab === 'Document_Types' && <DocumentTypes />}
      {activeTab === 'Project Roles' && <ProjectRoles />}
      {activeTab === 'Employment Types' && <EmploymentTypes />}
    </div>
  );
}
