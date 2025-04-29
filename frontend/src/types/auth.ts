// Interface for user data
export interface User {
  id: number;
  email: string;
  employee: {
    id: string;
    first_name: string;
    middle_name: string | null; // Nullable
    last_name: string;
    suffix: string | null; // Nullable
    gender: string;
    birthdate: string; // Date format
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
    job_position_id: number;
    date_hired: string; // Date format
    employment_type_id: number;
    manager_id: number | null; // Nullable
    profile_pic_url: string | null; // Nullable
  };
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
