import { z } from 'zod';

// Define validation schema using Zod
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required') // Email is required
    .email('Invalid email format') // Ensure it follows a valid email format
    .max(255, 'Email is too long'), // Limit the email to 255 characters (typical max length)
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
