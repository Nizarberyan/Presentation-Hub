import User from "../models/User";
import jwt from "jsonwebtoken";
import type { IUserDocument } from "../types/user.type";
import { ensureJwtSecret } from "../utils/JWT.utils.ts";
import type { AuthResult } from "../types/AuthResult.type";

export async function loginUser(
  email: string,
  password: string,
): Promise<AuthResult> {
  const user = (await User.findOne({ email })) as IUserDocument | null;
  if (!user || !(await user.comparePassword(password))) {
    const err = new Error("Invalid credentials") as Error & { status?: number };
    err.status = 401;
    throw err;
  }

  const jwtSecret = ensureJwtSecret();
  const token = jwt.sign({ id: user._id }, jwtSecret as jwt.Secret, {
    expiresIn: "1d",
  });

  return {
    message: "User logged in successfully",
    data: {
      user: {
        id: user._id!.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      },
        token,
    },

  };
}

export async function registerUser(
  email: string,
  password: string,
  name: string,
  role: string,
): Promise<AuthResult> {
  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error("User already exists") as Error & { status?: number };
    err.status = 400;
    throw err;
  }

  const user = new User({ email, password, name, role });
  await user.save();

  const jwtSecret = ensureJwtSecret();
  const token = jwt.sign({ id: user._id }, jwtSecret as jwt.Secret, {
    expiresIn: "1d",
  });

  return {
    message: "User registered successfully",
    data: {
      user: {
        id: user._id!.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    },
  };
}
