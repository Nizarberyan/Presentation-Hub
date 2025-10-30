export interface IPresentationDTO {
  date: string;
  binome: string;
  titre: string;
  description: string;
  note?: number;
  status?: "pending" | "approved" | "presented";
}

export interface IUserDTO {
  email: string;
  password: string;
  name: string;
  role?: "student" | "teacher";
}

export interface IAuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}
