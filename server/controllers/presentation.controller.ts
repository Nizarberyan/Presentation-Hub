import type { Request, Response } from "express";
import { getAllPresentations } from "../services/presentation.service.ts";
export default class PresentationController {
   public static getAllPresentations = async (req: Request, res: Response) => {
    try {
      const presentations = await getAllPresentations();
      res.status(200).json(presentations);
    } catch (error) {
      console.error('Error fetching presentations', error);
      res.status(500).json({ message: "Error fetching presentations" });
    }
}
}