import MovieCard from "@/components/MovieCard";
import styles from "./page.module.scss";

export default async function MoviePage() {
  const url = "http://localhost:3000/api/movies";

  const response = await fetch(url);
  const { movies } = await response.json();


  return (
    <div className={styles.movies__page}>
      <h1>Våra filmer</h1>
      <section className={styles.movies__grid}>
        {movies.map((movie => (
          <MovieCard key={movie._id} movie={movie} />
        )))
        }
      </section>
    </div>
  )
}