import mongoose from "mongoose";

export type PresentationStatus = "pending" | "approved" | "presented";

export interface IPresentation {
  date: string;
  titre: string;
  description: string;
  status?: PresentationStatus;
  assignedTo: mongoose.Types.ObjectId[] | string[];
  createdBy?: mongoose.Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: mongoose.Types.ObjectId | string;
}
