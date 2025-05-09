import { z } from 'zod';

export const documentTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const documentTypeArraySchema = z.array(documentTypeSchema);

export type DocumentType = z.infer<typeof documentTypeSchema>;
