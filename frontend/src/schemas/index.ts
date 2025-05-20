export { loginSchema } from './loginSchema';
export { updatePasswordSchema } from './profile/changePasswordSchema';
export { updatePersonalInfoSchema } from './profile/personalInformationSchema';
export { updateResidentialInfoSchema } from './profile/residentialInformationSchema';
export { updateGovBankNumberSchema } from './profile/govBankNumberSchema';
export { documentTypeSchema } from './settings/employee/document/documentType';
export { projectSchema, createProjectSchema } from './projects/project';
export { projectRoleSchema } from './settings/employee/project-role/projectRole';
export { employmentTypeSchema } from './settings/employee/employment-type/employmentType';
export { teamAssignSchema } from './settings/job-position/team-assign/teamAssign';
export {
  departmentAssignSchema,
  editDepartmentAssignSchema,
} from './settings/job-position/department-assign/departmentAssign';
export { recordSchema, recordColSchema } from './records/record';
export { userSchema } from './userSchema';
//export { skillCategorySchema } from './settings/employee/skill/skill-category/skillCategory';
//export { countryAssignSchema } from './settings/job-position/country-assign/countryAssign';
//export { officeAssignSchema } from './settings/job-position/office-assign/officeAssign';
export { skillSchema, employeeSkillSchema } from './settings/employee/skill/skill';

export type { LoginFormInputs } from './loginSchema';
export type { UpdatePasswordInput } from './profile/changePasswordSchema';
export type { UpdatePersonalInfoInput } from './profile/personalInformationSchema';
export type { UpdateResidentialInfoInput } from './profile/residentialInformationSchema';
export type { UpdateGovBankNumberInput } from './profile/govBankNumberSchema';
export type { DocumentType } from './settings/employee/document/documentType';
export type { Project, CreateProjectSchema } from './projects/project';
export type { ProjectRole } from './settings/employee/project-role/projectRole';
export type { EmploymentType } from './settings/employee/employment-type/employmentType';
export type { TeamAssign } from './settings/job-position/team-assign/teamAssign';
export type {
  DepartmentAssign,
  EditDepartmentAssignInput,
} from './settings/job-position/department-assign/departmentAssign';
export type { Record, RecordCol } from './records/record';
export type { UserSchema } from './userSchema';
//export type { SkillCategory } from './settings/employee/skill/skill-category/skillCategory';
//export type { CountryAssign } from './settings/job-position/country-assign/countryAssign';
//export type { OfficeAssign } from './settings/job-position/office-assign/officeAssign';
export type { Skill, EmployeeSkill } from './settings/employee/skill/skill';
