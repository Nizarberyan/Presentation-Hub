import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.ts";
import Presentation from "../models/Presentation.js";
import { faker } from "@faker-js/faker";

dotenv.config();

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error("Missing MONGODB_URI environment variable. Set it in .env or your environment.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB for seeds.");

    // Clear existing data
    await User.deleteMany({});
    await Presentation.deleteMany({});
    console.log("Cleared existing users and presentations.");

    // Create users
    const admin = await User.create({
      name: faker.person.fullName(),
      email: `admin+${faker.string.alphanumeric(6)}@example.com`,
      password: "password123",
      role: "admin",
    });

    const teacher = await User.create({
      name: faker.person.fullName(),
      email: `teacher+${faker.string.alphanumeric(6)}@example.com`,
      password: "password123",
      role: "teacher",
    });

    const student = await User.create({
      name: faker.person.fullName(),
      email: `student+${faker.string.alphanumeric(6)}@example.com`,
      password: "password123",
      role: "student",
    });

    // Create additional students for assignedTo
    const students = [student];
    for (let i = 0; i < 15; i++) {
      const additionalStudent = await User.create({
        name: faker.person.fullName(),
        email: `student+${faker.string.alphanumeric(6)}@example.com`,
        password: "password123",
        role: "student",
      });
      students.push(additionalStudent);
    }

    console.log("Created admin, teacher and students:", admin.email, teacher.email, `${students.length} students`);

    // Create presentations
    const statuses = ["pending", "approved", "presented"];
    const presentationsToCreate = Array.from({ length: 10 }).map(() => {
      // Randomly assign 1-3 students to each presentation
      const numStudents = faker.number.int({ min: 1, max: 3 });
      const assignedStudents = faker.helpers.arrayElements(students, numStudents);

      return {
        titre: faker.lorem.words({ min: 2, max: 6 }),
          //@ts-ignore
        assignedTo: assignedStudents.map(s => s._id),
        date: faker.date.future({ years: 1 }).toISOString().split("T")[0],
        description: faker.lorem.paragraphs({ min: 1, max: 2 }),
        status: faker.helpers.arrayElement(statuses),
        createdBy: teacher._id,
      };
    });

    await Presentation.create(presentationsToCreate);
    console.log(`Seeded ${presentationsToCreate.length} presentations.`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB. Seeding complete.");
    process.exit(0);
  } catch (err) {
    console.error("Error while seeds:", err instanceof Error ? err.message : err);
    try {
      await mongoose.disconnect();
    } catch {}
    process.exit(1);
  }
}

main();
