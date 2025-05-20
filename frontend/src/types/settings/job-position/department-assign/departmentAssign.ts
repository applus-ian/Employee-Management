export interface DepartmentAssign {
  id: number;
  name: string;
  parent_department?: ParentDepartment[];
}

export interface ParentDepartment {
  id: number;
  name: string;
}

export interface CreateDepartmentAssign {
  id: number;
  name: string;
  parent_department?: ParentDepartment[];
}
