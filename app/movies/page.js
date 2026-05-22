import MovieList from "@/components/MovieList";
import MovieCard from "@/components/MovieCard";
import styles from "./page.module.scss";

export default async function MoviePage() {
  try {
    const url = "http://localhost:3000/api/movies";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const { movies } = await response.json();

    return (
      <>
        <h1 className="{styles.page__title">
          Våra filmer
        </h1>
        <MovieList movies={movies} />
      </>
    )
  } catch (error) {
    console.log(error);
    return <p>Movies could not load</p>
  }
}