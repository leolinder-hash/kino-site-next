import { connectDB } from "../lib/mongodb.js";
import User from "../models/User.js";

const users = [
  {
    username: "alice",
    email: "alice@example.com",
    password: "Password123!",
  },
  {
    username: "bob",
    email: "bob@example.com",
    password: "Password123!",
  },
  {
    username: "charlie",
    email: "charlie@example.com",
    password: "Password123!",
  },
  {
    username: "kino_admin",
    email: "admin@kino.test",
    password: "AdminPass1!",
  },
];

async function seedUsers() {
  try {
    await connectDB();

    await User.deleteMany();
    console.log("Gamla användare borttagna.");

    
    for (const userData of users) {
      const user = await User.create(userData);
      console.log(`Skapade användare: ${user.username} (${user.email})`);
    }

    console.log("Seed data för användare har lagts till.");
    process.exit(0);
  } catch (error) {
    console.error("Fel vid seedning:", error);
    process.exit(1);
  }
}

seedUsers();
