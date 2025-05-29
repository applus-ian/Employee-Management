import { z } from 'zod';

export const updatePersonalPhotoSchema = z.object({
  profile_pic_url: z.string().optional(),
});

export type UpdatePersonalPhotoInput = z.infer<typeof updatePersonalPhotoSchema>;
