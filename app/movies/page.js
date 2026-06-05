import MovieList from "@/components/MovieList";
import { connectDB } from "@/lib/mongodb";
import Movie from "@/models/Movie";
import styles from "./page.module.scss";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export default async function MoviePage() {
  await connectDB();

  const movies = await Movie.find({}).lean();
  const safeMovies = JSON.parse(JSON.stringify(movies));

  return (
    <>
      <h1 className={styles.page__title}>Våra filmer</h1>
      <MovieList movies={safeMovies} />
    </>
  );
}
