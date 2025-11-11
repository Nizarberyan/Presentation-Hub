import express from "express";
const router = express.Router();
import PresentationController from "../controllers/presentation.controller";
// Get all presentations
router.get("/", PresentationController.getAllPresentations);

router.post("/", () => {
  console.log("hello");
});

export default router;
