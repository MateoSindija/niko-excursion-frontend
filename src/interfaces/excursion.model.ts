export interface IExcursion {
  id: string;
  titleHr: string;
  titleEn: string;
  descriptionEng: string;
  descriptionCro: string;
  duration: number;
  images: string[] | null;
  createdAt: { seconds: number; nanoseconds: number };
  updatedAt: { seconds: number; nanoseconds: number };
  authorId: string | null;
  excursion: null;
  price: number;
  titleImage: string;
  maxPersons: number;
}
