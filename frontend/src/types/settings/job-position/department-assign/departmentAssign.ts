export interface DepartmentAssign {
  id: number;
  name: string;
  parent_department: ParentDepartment | null;
}

export interface ParentDepartment {
  id: number;
  name: string;
}

export interface CreateDepartmentAssign {
  name: string;
  parent_department: ParentDepartment | null;
}
