import { z } from 'zod';

// Role schema
const roleSchema = z.object({
  id: z.number(),
  name: z.string(),
});

// Job Position schema
const jobPositionSchema = z.object({
  id: z.number(),
  title: z.string(),
});

// Nested location assignment schema
const locationAssignmentSchema = z.object({
  id: z.number(),
  job_position_id: z.number(),
  employee_id: z.string(),
  country_assign: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .optional(),
  office_assign: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .optional(),
  team_assign: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .optional(),
  department_assign: z
    .object({
      id: z.number(),
      name: z.string(),
      parent_department: z
        .object({
          id: z.number(),
          name: z.string(),
        })
        .optional(),
    })
    .optional(),
});

// Employment type schema
const employmentTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
});

// Manager schema (nullable)
const managerSchema = z
  .object({
    id: z.number(),
    email: z.string().email(),
    full_name: z.string(),
  })
  .nullable();

// Employee schema
export const employeeSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  middle_name: z.string().nullable(),
  last_name: z.string(),
  suffix: z.string().nullable(),
  gender: z.string(),
  birthdate: z.string(), // Ideally ISO format
  age: z.number(),
  is_birthday: z.boolean(),
  civil_status: z.string(),
  nationality: z.string(),
  region: z.string(),
  province: z.string(),
  city_or_municipality: z.string(),
  barangay: z.string(),
  street: z.string(),
  phone_number: z.string(),
  emergency_contact1: z.string(),
  emergency_contact2: z.string(),
  email: z.string().email(),
  date_hired: z.string(),
  profile_pic_url: z.string().url().nullable(),
  tin_number: z.string().nullable(),
  sss_number: z.string().nullable(),
  pagibig_number: z.string().nullable(),
  philhealth_number: z.string().nullable(),
  bank_number: z.string().nullable(),

  job_position: jobPositionSchema,
  location_assignment: locationAssignmentSchema,
  employment_type: employmentTypeSchema,
  manager: managerSchema,
});

// User schema (final)
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  employee: employeeSchema,
  roles: z.array(roleSchema),
});

export type UserSchema = z.infer<typeof userSchema>;
