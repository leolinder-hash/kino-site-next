import MovieList from "@/components/MovieList";
import styles from "./page.module.scss";

export default async function MoviePage() {
    const url = "http://localhost:3000/api/movies";

    const response = await fetch(url);

    if (!response.ok) {
      return <p>Movies could not load</p>
    }

    const { movies } = await response.json();

    return (
      <>
        <h1 className={styles.page__title}>
          Våra filmer
        </h1>
        <MovieList movies={movies} />
      </>
    )
}