"use client";

import { useState } from "react";
import MovieCard from "./MovieCard";
import styles from "./MovieList.module.scss";

export default function MovieList({ movies }) {
  const [currentPage, setCurrentPage] = useState(1);

  const moviesPerPage = 6;

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / moviesPerPage);


  return (
    <div className={styles.movies__list}>
      <section className={styles.movies__grid}>
        {currentMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </section>
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Bakåt
        </button>
        <p> {currentPage} / {totalPages}</p>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Nästa
        </button>
      </div>
    </div>
  )
}