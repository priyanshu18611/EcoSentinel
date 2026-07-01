import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Animal from "../models/Animal.js";
import User from "../models/User.js";

dotenv.config();

const animals = [
  {
    name: "Kesari",
    species: "Bengal Tiger",
    tagId: "TAG-TIG-001",
    status: "healthy",
    conservationStatus: "endangered",
    lastLocation: { lat: 1.2, lng: 35.1 },
    habitat: "Sundarbans Reserve",
    vitals: { heartRate: 72, temperature: 38.0, speed: 4 },
  },
  {
    name: "Gonda",
    species: "African Elephant",
    tagId: "TAG-ELE-002",
    status: "at-risk",
    conservationStatus: "vulnerable",
    lastLocation: { lat: 0.5, lng: 36.0 },
    habitat: "Serengeti Plains",
    vitals: { heartRate: 45, temperature: 36.8, speed: 2 },
  },
  {
    name: "Nandi",
    species: "Indian Rhino",
    tagId: "TAG-RHI-003",
    status: "healthy",
    conservationStatus: "vulnerable",
    lastLocation: { lat: 1.8, lng: 34.2 },
    habitat: "Kaziranga Grasslands",
    vitals: { heartRate: 60, temperature: 37.2, speed: 1 },
  },
  {
    name: "Simba",
    species: "African Lion",
    tagId: "TAG-LIO-004",
    status: "healthy",
    conservationStatus: "vulnerable",
    lastLocation: { lat: -0.9, lng: 34.9 },
    habitat: "Masai Mara Reserve",
    vitals: { heartRate: 80, temperature: 38.5, speed: 6 },
  },
  {
    name: "Amara",
    species: "Snow Leopard",
    tagId: "TAG-LEO-005",
    status: "unknown",
    conservationStatus: "critically-endangered",
    lastLocation: { lat: 2.1, lng: 37.9 },
    habitat: "Himalayan Foothills",
    vitals: { heartRate: 65, temperature: 37.0, speed: 3 },
  },
];

const seed = async () => {
  try {
    await connectDB();
    await Animal.deleteMany();
    await Animal.insertMany(animals);

    const adminExists = await User.findOne({ email: "admin@ecosentinel.org" });
    if (!adminExists) {
      await User.create({
        name: "Admin Ranger",
        email: "admin@ecosentinel.org",
        password: "admin123",
        role: "admin",
      });
    }

    console.log("🌱 Seed data inserted successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();
