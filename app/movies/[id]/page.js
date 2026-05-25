import MovieDetail from "@/components/MovieDetail";

export default async function MovieDetailPage({ params }) {
  try {
    const { id } = await params;
    const url = `http://localhost:3000/api/movies/${id}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch movie");
    }

    const { movie } = await response.json();
    console.log(movie);

    return (
      <MovieDetail movie={movie} />
    )

  } catch (error) {
    console.log(error);
    return <p>Movie could not be found</p>
  }
}