import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { type IUser } from "../models/User";
function loginUser(req: Request, res: Response) {
  const { email, password }: { email: string; password: string } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.comparePassword(password).then((isMatch: boolean) => {
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .json({
          message: "success",
          token,
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        });
    });
  });
}
function registerUser(req: Request, res: Response) {
  // Implémentation de l'inscription utilisateur
}
export { loginUser, registerUser };
