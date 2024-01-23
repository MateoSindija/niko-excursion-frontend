import z from 'zod';

export const contactSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(50),
  message: z.string().min(2).max(1000),
});

export type User = z.infer<typeof contactSchema>;
