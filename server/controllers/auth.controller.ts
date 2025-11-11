import type { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";

class AuthController {
  public static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await loginUser(email, password);

      // set cookie and return
      res.cookie("token", result.data.token, { httpOnly: true });
      res.json({ user: result.data.user, token: result.data.token });
    } catch (error: any) {
      const status = error?.status ?? 500;
      const message = error?.message ?? "An unknown error occurred";
      res.status(status).json({ error: message });
    }
  };

  public static register = async (req: Request, res: Response) => {
    try {
      const { email, password, name, role } = req.body;
      const result = await registerUser(email, password, name, role);
      res.cookie("token", result.data.token, { httpOnly: true });
      res.json({ user: result.data.user, token: result.data.token });
    } catch (error: any) {
      const status = error?.status ?? 500;
      const message = error?.message ?? "An unknown error occurred";
      res.status(status).json({ error: message });
    }
  };
}

export default AuthController;
