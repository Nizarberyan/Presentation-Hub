export interface Presentation {
  _id?: string;
  date: string;
  binome: string;
  titre: string;
  description: string;
  note?: number;
  status: "pending" | "approved" | "presented";
  submittedAt: string;
}
