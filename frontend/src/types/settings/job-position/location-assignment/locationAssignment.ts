import { JobPosition } from '../job-position/jobPosition';

export interface LocationAssignment {
  id: number;
  employee: {
    id: string;
    first_name: string;
    last_name: string;
  };
  job_position: JobPosition;
  country_assign: {
    id: number;
    name: string;
  } | null;
  office_assign: {
    id: number;
    name: string;
  } | null;
  team_assign: {
    id: number;
    name: string;
  } | null;
  department_assign: {
    id: number;
    name: string;
    parent_department: {
      id: number;
      name: string;
    } | null;
  } | null;
}
