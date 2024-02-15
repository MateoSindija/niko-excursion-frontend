import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(50),
});

export type User = z.infer<typeof loginSchema>;
