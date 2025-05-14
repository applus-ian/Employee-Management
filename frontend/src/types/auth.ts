// Interface for role data
export interface Role {
  id: number;
  name: string;
}

// Interface for user data
export interface User {
  id: string;
  email: string;
  employee: {
    id: string;
    first_name: string;
    middle_name: string | null; // Nullable
    last_name: string;
    suffix: string | null; // Nullable
    gender: string;
    birthdate: string; // Date format
    age: number;
    is_birthday: boolean;
    civil_status: string;
    nationality: string;
    region: string;
    province: string;
    city_or_municipality: string;
    barangay: string;
    street: string;
    phone_number: string;
    emergency_contact1: string;
    emergency_contact2: string;
    email: string;
    date_hired: string; // Date format
    profile_pic_url: string | null; // Nullable
    tin_number: string | null; // Nullable
    sss_number: string | null; // Nullable
    pagibig_number: string | null; // Nullable
    philhealth_number: string | null; // Nullable
    bank_number: string | null; // Nullable

    // Nested data
    job_position: {
      id: number;
      title: string;
    };
    location_assignment: {
      id: number;
      job_position_id: number;
      employee_id: string;
      country_assign?: {
        id: number;
        name: string;
      };
      office_assign?: {
        id: number;
        name: string;
      };
      team_assign?: {
        id: number;
        name: string;
      };
      department_assign?: {
        id: number;
        name: string;
        parent_department?: {
          id: number;
          name: string;
        };
      };
    };
    employment_type: {
      id: number;
      name: string;
    };
    manager: {
      id: number;
      email: string;
      full_name: string;
    } | null;
  };
  roles: Role[]; // Add roles as an array of Role objects
}

// Interface for login request credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Interface for login response
export interface LoginResponse {
  token: string;
  user: User;
}
