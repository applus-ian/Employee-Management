export interface Project {
  id: number;
  name: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  employees: AssignedEmployee[] | null;
}

export interface AssignedEmployee {
  id: string;
  profile: string | null;
  full_name: string;
  job_position: string;
  department: string | null;
  project_role_id: number;
}

export interface CreateProject {
  name: string;
  description?: string | null;
  employees?: { id: string; project_role_id: number }[] | null;
  start_date: string;
  end_date?: string | null;
}

export interface UpdateProject {
  id: number;
  name: string;
  description?: string | null;
  employees?: { id: string; project_role_id: number }[] | null;
  start_date: string;
  end_date?: string | null;
}
