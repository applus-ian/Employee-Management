import { z } from 'zod';

const uploadedDocumentationSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  file_url: z.string(), // path to the file
  document_type_id: z.number(),
  expiry_date: z.string().optional(), // ISO date string
});

const location_assignmentSchema = z.object({
  country_assign_id: z.number().optional(),
  office_assign_id: z.number().optional(),
  team_assign_id: z.number().optional(),
  department_assign_id: z.number().optional(),
});

const employeeSkillSchema = z.object({
  skill_id: z.number(),
  years_of_experience: z.number(),
});

export const createEmployeeSchema = z.object({
  // Personal Information
  first_name: z.string().min(1, 'First name is required').max(255),
  middle_name: z.string().max(255).optional(),
  last_name: z.string().min(1, 'Last name is required').max(255),
  suffix: z.string().max(50).optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  birthdate: z.string().min(1, 'Birthdate is required'),
  civil_status: z.enum(['single', 'married', 'widowed', 'divorced', 'separated', 'anulled']),
  nationality: z.string().min(1, 'Nationality is required').max(100),
  phone_number: z.string().min(1, 'Phone number is required').max(20),
  email: z.string().email('Invalid email address').max(150),

  // Residential Address
  region: z.string().min(1, 'Region is required').max(100),
  province: z.string().min(1, 'Province is required').max(100),
  city_or_municipality: z.string().min(1, 'City/Municipality is required').max(100),
  barangay: z.string().min(1, 'Barangay is required').max(100),
  street: z.string().min(1, 'Street is required').max(150),

  // Emergency Contact
  emergency_contact1_name: z.string().min(1, 'Emergency contact name is required').max(100),
  emergency_contact1_relationship: z.string().min(1, 'Relationship is required').max(100),
  emergency_contact1_phone_number: z.string().min(1, 'Phone number is required').max(20),
  emergency_contact2_name: z.string().max(100).optional(),
  emergency_contact2_relationship: z.string().max(100).optional(),
  emergency_contact2_phone_number: z.string().max(20).optional(),

  // Employment Information
  date_hired: z.string().min(1, 'Date hired is required'),
  job_position_id: z.number().min(1, 'Job position is required'),
  employment_type_id: z.number().min(1, 'Employment type is required'),

  // Location Assignment
  location_assignment: location_assignmentSchema,

  // Employee Skill
  employee_skills: z.array(employeeSkillSchema),

  // Government & Bank Information
  tin_number: z.string().nullable(),
  sss_number: z.string().nullable(),
  pagibig_number: z.string().nullable(),
  philhealth_number: z.string().nullable(),
  bank_number: z.string().nullable(),

  // Documentation
  uploaded_documentations: z.array(uploadedDocumentationSchema),
});
