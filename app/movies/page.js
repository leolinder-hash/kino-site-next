import MovieCard from "@/components/MovieCard"

export default async function MoviePage() {
  const url = "http://localhost:3000/api/movies";

  const response = await fetch(url);
  const { movies } = await response.json();


  return (
    <div>
      <h1>Alla filmer</h1>
      <div>{movies.map((movie => (
        <MovieCard key={movie._id} movie={movie} />
      )))
      }
      </div>
    </div>
  )
}