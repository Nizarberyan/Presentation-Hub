import express from "express";
import {
  createPresentation,
  getPresentations,
  getPresentationById,
  updatePresentation,
  deletePresentation,
} from "../controllers/presentationController";

const router = express.Router();

// Get all presentations
router.get("/", getPresentations);

// Get a specific presentation by ID
router.get("/:id", getPresentationById);

// Create a new presentation
router.post("/", createPresentation);

// Update an existing presentation
router.put("/:id", updatePresentation);

// Delete a presentation
router.delete("/:id", deletePresentation);

export default router;
