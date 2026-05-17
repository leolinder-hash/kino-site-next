import { connectDB } from "../lib/mongodb.js";
import Movie from "../models/Movie.js";

const movies = [
  {
    title: "Dune: Part Two",
    description: "Paul Atreides fortsätter sin resa och kämpar för att förändra framtiden.",
    genre: ["Sci-Fi", "Adventure"],
    duration: 166,
    ageLimit: 11,
    image: "/images/dune2.jpg",
    featured: true,
  },
  {
    title: "Inside Out 2",
    description: "Rileys känslor förändras när nya känslor dyker upp.",
    genre: ["Animation", "Family", "Comedy"],
    duration: 96,
    ageLimit: 7,
    image: "/images/insideout2.jpg",
    featured: true,
  },
  {
    title: "Oppenheimer",
    description: "En film om J. Robert Oppenheimer och utvecklingen av atombomben.",
    genre: ["Drama", "History"],
    duration: 180,
    ageLimit: 15,
    image: "/images/oppenheimer.jpg",
    featured: false,
  },
  {
    title: "Barbie",
    description: "Barbie lämnar Barbieland och upptäcker den verkliga världen.",
    genre: ["Comedy", "Fantasy"],
    duration: 114,
    ageLimit: 7,
    image: "/images/barbie.jpg",
    featured: false,
  },
];

async function seedMovies() {
  try {
    await connectDB();

    await Movie.deleteMany();
    console.log("Gamla filmer borttagna.");

    await Movie.insertMany(movies);
    console.log("Seed data för filmer har lagts till.");

    process.exit(0);
  } catch (error) {
    console.error("Fel vid seedning:", error);
    process.exit(1);
  }
}

seedMovies();