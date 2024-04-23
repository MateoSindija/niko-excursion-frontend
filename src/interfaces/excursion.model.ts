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
  excursion: null;
  price: number;
  titleImage: string;
  maxPersons: number;
  isExcursionPublic: boolean;
  hours: number[];
}

export interface IExcursionRequest {
  clientName: string;
  clientEmail: string;
  clientNumber: string;
  price: number;
  isApproved: 'sent' | 'refused' | 'confirmed';
  passengerNumber: number;
  date: { seconds: number; nanoseconds: number };
  deletionDate: { seconds: number; nanoseconds: number };
  excursionTitle: string;
  excursionId: string;
  requestId: string;
  departureHour: number;
  optionalMessage?: string;
  createdAt: { seconds: number; nanoseconds: number };
}
