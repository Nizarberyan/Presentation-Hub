import mongoose, { Schema, Document } from "mongoose";

export interface IPresentation extends Document {
  date: string;
  binome: string;
  titre: string;
  description: string;
  note?: number;
  status: "pending" | "approved" | "presented";
  submittedAt: Date;
  updatedAt: Date;
}

const PresentationSchema = new Schema<IPresentation>(
  {
    date: {
      type: String,
      required: [true, "La date est requise"],
      validate: {
        validator: function (v: string) {
          return /^\d{4}-\d{2}-\d{2}$/.test(v);
        },
        message: "Format de date invalide (YYYY-MM-DD)",
      },
    },
    binome: {
      type: String,
      required: [true, "Le binôme est requis"],
      trim: true,
      minlength: [3, "Le binôme doit contenir au moins 3 caractères"],
    },
    titre: {
      type: String,
      required: [true, "Le titre est requis"],
      trim: true,
      minlength: [5, "Le titre doit contenir au moins 5 caractères"],
      maxlength: [200, "Le titre ne peut pas dépasser 200 caractères"],
    },
    description: {
      type: String,
      required: [true, "La description est requise"],
      trim: true,
      minlength: [20, "La description doit contenir au moins 20 caractères"],
      maxlength: [1000, "La description ne peut pas dépasser 1000 caractères"],
    },
    note: {
      type: Number,
      min: [0, "La note ne peut pas être inférieure à 0"],
      max: [20, "La note ne peut pas dépasser 20"],
      default: null,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "presented"],
        message: "{VALUE} n'est pas un statut valide",
      },
      default: "pending",
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
PresentationSchema.index({ date: 1 });
PresentationSchema.index({ status: 1 });
PresentationSchema.index({ binome: 1 });

// Middleware pour mettre à jour updatedAt avant chaque sauvegarde
PresentationSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Méthode virtuelle pour vérifier si la présentation est passée
PresentationSchema.virtual("isPast").get(function () {
  return new Date(this.date) < new Date();
});

export default mongoose.model<IPresentation>(
  "Presentation",
  PresentationSchema,
);
