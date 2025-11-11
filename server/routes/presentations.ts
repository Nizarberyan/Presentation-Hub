import express from "express";
const router = express.Router();
import PresentationController from "../controllers/presentation.controller";
// Get all presentations
router.get("/", PresentationController.getAllPresentations);

router.get("/:id", PresentationController.getPresentationById);

export default router;
