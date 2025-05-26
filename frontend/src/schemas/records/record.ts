import { z } from 'zod';
import { userSchema } from '../userSchema';

const documentationSchema = z.object({
  id: z.number(),
  emp_id: z.string(),
  name: z.string(),
  description: z.string(),
  file_url: z.string().url(),
  document_type_name: z.string(),
  upload_date: z.string(), // ISO date string
  expiry_date: z.string(), // ISO date string
});

const employeeSkillSchema = z.object({
  emp_id: z.string(),
  skill_name: z.string(),
  years_of_experience: z.number(),
});

const employeeProjectsSchema = z.object({
  emp_id: z.string(),
  project_name: z.string(),
  project_role_name: z.string(),
  start_date: z.string(), // ISO date string
  end_date: z.string(), // ISO date string
});

const employeeStatusHistorySchema = z.object({
  emp_id: z.string(),
  status_set: z.string(),
  effective_date: z.string(), // ISO date string
});

export const recordSchema = z.object({
  records: z.object({
    users: z.array(userSchema),
    projects: z.array(employeeProjectsSchema),
    skills: z.array(employeeSkillSchema),
    documentations: z.array(documentationSchema),
    employee_status: z.array(employeeStatusHistorySchema),
  }),
});

export type Record = z.infer<typeof recordSchema>;

export const recordColSchema = z.object({
  employee_id: z.string(),
  profile: z.string(),
  full_name: z.string(),
  title: z.string(),
  email: z.string(),
  user_role: z.string(),
});

export type RecordCol = z.infer<typeof recordColSchema>;
