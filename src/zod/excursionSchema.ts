import z from 'zod';

export const excursionSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Naziv mora imati barem 3 znaka' })
    .max(100, { message: 'Naziv mora imati max 100 znakova' }),
  duration: z.coerce
    .number()
    .min(1, { message: 'Eskurzija mora trajati barem 1 sat' })
    .max(10, { message: 'Eskurzija može trajati max 10 sati ' }),
  descCro: z
    .string()
    .min(2, { message: 'Opis mora sadržavati barem 2 znaka' })
    .max(10000, { message: 'Opis mora sadržavati barem 10000 znakova' }),
  descEng: z
    .string()
    .min(2, { message: 'Opis mora sadržavati barem 2 znaka' })
    .max(10000, { message: 'Opis mora sadržavati barem 10000 znakova' }),
});

export type User = z.infer<typeof excursionSchema>;
