import z, { ZodObject } from 'zod';

const NumberOrString = z.union([
  z.string(), // allows strings
  z.number().refine((value) => value >= 0, {
    message: 'Value must be a number greater than or equal to 0',
  }), // allows numbers greater than or equal to 0
]);

export const excursionSchema = z.object({
  titleHr: z
    .string()
    .min(3, { message: 'Naziv mora imati barem 3 znaka' })
    .max(100, { message: 'Naziv mora imati max 100 znakova' }),
  titleEn: z
    .string()
    .min(3, { message: 'Naziv mora imati barem 3 znaka' })
    .max(100, { message: 'Naziv mora imati max 100 znakova' }),
  duration: z.coerce
    .number()
    .min(1, { message: 'Ekskurzija mora trajati barem 1 sat' })
    .max(10, { message: 'Ekskurzija može trajati max 10 sati ' }),
  price: z.coerce
    .number()
    .min(1, { message: 'Ekskurzija mora koštati minumum 1€' })
    .max(10000, { message: 'Ekskurzija može koštati najviše max 1000€' }),
  maxPersons: z.coerce
    .number()
    .min(1, { message: 'Minimum broj dozvoljenih osoba mora biti barem 1' })
    .max(100, {
      message: 'Maksimalni broj dozvoljenih ne osoba može biti preko 100',
    }),
  descCro: z
    .string()
    .min(2, { message: 'Opis mora sadržavati barem 2 znaka' })
    .max(10000, { message: 'Opis mora sadržavati barem 10000 znakova' }),
  descEng: z
    .string()
    .min(2, { message: 'Opis mora sadržavati barem 2 znaka' })
    .max(10000, { message: 'Opis mora sadržavati barem 10000 znakova' }),
  titleImage: NumberOrString,
  isExcursionPublic: z.coerce.boolean(),
  hours: z
    .array(z.coerce.number().min(9).max(22))
    .refine((val) => val.length > 0, {
      message: 'Hours must have at least one number in array',
      path: ['hours'],
    }),
});

export const excursionReserveSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(3).max(100),
  message: z.string().min(2).max(1000).optional().or(z.literal('')),
  email: z.string().email(),
  date: z.date().min(new Date('dd/MM/YYYY')),
  passengers: z.coerce.number().min(1).max(100),
});

export type User = z.infer<typeof excursionSchema>;
export type ExcursionReserve = z.infer<typeof excursionReserveSchema>;
