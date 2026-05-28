import { connectDB } from "../lib/mongodb.js";
import Review from "../models/Review.js";
import User from "../models/User.js";
import Movie from "../models/Movie.js";

const reviewTemplates = [
  { rating: 5, reviewText: "Helt fantastisk film! En av årets bästa upplevelser på bio." },
  { rating: 4, reviewText: "Riktigt bra film med starka skådespelarinsatser och fin regi." },
  { rating: 3, reviewText: "Okej film, men hade förväntat mig lite mer av handlingen." },
  { rating: 5, reviewText: "Visuellt mästerverk! Bild och ljud var helt enastående." },
  { rating: 2, reviewText: "Tyvärr inte min kopp te. Tempo var långsamt och slutet kändes platt." },
  { rating: 2, reviewText: "Bleh" },
  { rating: 4, reviewText: "Bra film." },
  { rating: 4, reviewText: "Mycket underhållande från start till slut. Rekommenderas varmt!" },
];

async function seedReviews() {
  try {
    await connectDB();

    const users = await User.find();
    const movies = await Movie.find();

    if (users.length === 0) {
      console.error("Inga användare hittades. Kör 'npm run seed:users' först.");
      process.exit(1);
    }

    if (movies.length === 0) {
      console.error("Inga filmer hittades. Kör 'npm run seed:movies' först.");
      process.exit(1);
    }

    await Review.deleteMany();
    console.log("Gamla recensioner borttagna.");

    const reviews = [];
    for (const movie of movies) {
      const reviewerCount = 50;
      for (let i = 0; i < reviewerCount; i++) {
        const template = reviewTemplates[i];
        reviews.push({
          user: users[i % users.length]._id,
          movie: movie._id,
          rating: template.rating,
          reviewText: template.reviewText,
        });
      }
    }

    await Review.insertMany(reviews);
    console.log(`Seed data för recensioner har lagts till (${reviews.length} st).`);

    process.exit(0);
  } catch (error) {
    console.error("Fel vid seedning:", error);
    process.exit(1);
  }
}

seedReviews();
