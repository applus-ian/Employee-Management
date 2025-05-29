export interface UploadedDocumentation {
  name: string;
  description?: string;
  file_url: string;
  document_type_id: number;
  expiry_date?: string;
}

export interface LocationAssignment {
  country_assign_id?: number;
  office_assign_id?: number;
  team_assign_id?: number;
  department_assign_id?: number;
}

export interface EmployeeSkill {
  skill_id: number;
  years_of_experience: number;
}

export interface CreateEmployeeData {
  // Personal Information
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix?: string;
  gender?: 'male' | 'female' | 'other';
  birthdate: string;
  civil_status: 'single' | 'married' | 'widowed' | 'divorced' | 'separated' | 'anulled';
  nationality: string;
  phone_number: string;
  email: string;

  // Residential Address
  region: string;
  province: string;
  city_or_municipality: string;
  barangay: string;
  street: string;

  // Emergency Contact
  emergency_contact1_name: string;
  emergency_contact1_relationship: string;
  emergency_contact1_phone_number: string;
  emergency_contact2_name?: string;
  emergency_contact2_relationship?: string;
  emergency_contact2_phone_number?: string;

  // Employment Information
  date_hired: string;
  job_position_id: number;
  employment_type_id: number;

  // Location Assignment
  location_assignment: LocationAssignment;

  // Employee Skill
  employee_skills: EmployeeSkill[];

  // Government & Bank Information
  tin_number: string | null;
  sss_number: string | null;
  pagibig_number: string | null;
  philhealth_number: string | null;
  bank_number: string | null;

  // Documentation
  uploaded_documentations: UploadedDocumentation[];
}
