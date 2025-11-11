import type { Request, Response } from "express";
import { getAllPresentations, getPresentationById } from "../services/presentation.service.ts";
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
    public static getPresentationById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Missing presentation id" });
        }

        try {
            const presentation = await getPresentationById(id);
            if (!presentation) {
                return res.status(404).json({ message: "Presentation not found" });
            }
            return res.status(200).json(presentation);
        } catch (error) {
            console.error('Error fetching presentation', error);
            return res.status(500).json({ message: "Error fetching presentation" });
        }
    };
}