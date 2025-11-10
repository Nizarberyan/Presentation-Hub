import mongoose from "mongoose";
import Presentation from "../models/Presentation";
import User from "../models/User";
import { connectDB } from "../config/database";

const seedData = async () => {
  await connectDB();

  // Clear existing data
  await Presentation.deleteMany({});
  await User.deleteMany({});

  // Create teacher
  await User.create({
    email: "teacher@example.com",
    password: "password123",
    name: "Professor Smith",
    role: "teacher",
  });

  // Create students
  await User.create({
    email: "student1@example.com",
    password: "password123",
    name: "Ayoub Jebbouri",
    role: "student",
  });

  // Create presentations
  await Presentation.create([
    {
      date: "2024-10-28",
      binome: "Ayoub Jebbouri & Ayoub Fetti",
      titre: "Comparatif des solutions de déploiement",
      description:
        "Analyse comparative des principales solutions d'hébergement pour une API Node.js",
      status: "approved",
    },
    {
      date: "2024-10-29",
      binome: "Nizar Beriane & Ikram El Benallali",
      titre: "PM2 : gestion et supervision des processus Node.js",
      description: "Présentation des fonctionnalités clés de PM2",
      status: "pending",
    },
  ]);

  console.log("✅ Data seeded successfully!");
  process.exit(0);
};

seedData();
