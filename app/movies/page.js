import MovieList from "@/components/MovieList";
import styles from "./page.module.scss";

export default async function MoviePage() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/api/movies`);

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