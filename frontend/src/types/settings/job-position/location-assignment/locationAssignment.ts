import { JobPosition } from '../job-position/jobPosition';
import { CountryAssign } from '../country-assign/countryAssign';
import { OfficeAssign } from '../office-assign/officeAssign';
import { TeamAssign } from '../team-assign/teamAssign';
import { DepartmentAssign } from '../department-assign/departmentAssign';

export interface LocationAssigment {
  id: number;
  job_positon: JobPosition;
  country_assign: CountryAssign;
  office_assign: OfficeAssign;
  team_assign: TeamAssign;
  department_assign: DepartmentAssign;
}
