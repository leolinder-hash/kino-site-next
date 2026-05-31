export function pickTopRatedMovies(movies, reviews, count = 5) {
  const totalRatingPerMovie = new Map();

  for (const review of reviews) {
    const movieId = String(review.movie?._id ?? review.movie);
    const current = totalRatingPerMovie.get(movieId) ?? { sum: 0, n: 0 };
    current.sum += review.rating;
    current.n += 1;
    totalRatingPerMovie.set(movieId, current);
  }

  return [...movies]
    .map((movie) => {
      const stats = totalRatingPerMovie.get(String(movie._id));
      const average = stats ? stats.sum / stats.n : 0;
      return { movie, average };
    })
    .sort((a, b) => b.average - a.average)
    .slice(0, count)
    .map(({ movie }) => movie);
}
