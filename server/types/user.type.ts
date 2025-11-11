// Add TypeScript types for a User model used across the server
import mongoose from "mongoose";

export type UserRole = "student" | "teacher" | "admin";

export interface IUser {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: mongoose.Types.ObjectId | string;
}

// Mongoose Document type for a User, including instance methods (comparePassword)
export type IUserDocument = mongoose.Document &
  IUser & {
    comparePassword(password: string): Promise<boolean>;
  };
