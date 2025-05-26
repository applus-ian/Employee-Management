export interface CreateSkill {
  name: string;
  description: string | null;
  skill_category_id: number;
}

export interface Skill {
  id: number;
  name: string;
  description: string | null;
  skill_category: {
    id: number;
    name: string;
  };
}

export interface EmployeeSkill {
  employee_id: string;
  skill: Skill;
  years_of_experience: number;
}
