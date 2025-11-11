import mongoose from "mongoose";
import type { IPresentation } from "../types/presentation.type";
const presentationSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    titre: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "presented"],
      default: "pending",
    },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

export default mongoose.model<mongoose.Document & IPresentation>(
  "Presentation",
  presentationSchema,
);
