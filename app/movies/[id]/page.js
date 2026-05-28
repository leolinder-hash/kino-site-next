import { notFound } from "next/navigation";
import MovieDetail from "@/components/MovieDetail";

export default async function MovieDetailPage({ params }) {
  const { id } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const movieResponse = await fetch(`${baseUrl}/api/movies/${id}`);

  if (!movieResponse.ok) {
    notFound();
  }

  const { movie } = await movieResponse.json();

  const screeningsResponse = await fetch(`${baseUrl}/api/screenings`);

  if(!screeningsResponse.ok){
    notFound();
  }

  const { screenings } = await screeningsResponse.json();

  const movieScreenings = screenings.filter((screening)=>{
    const screeningMovieId =
    typeof screening.movie === "string"
    ? screening.movie
    : screening.movie?._id;


    return screeningMovieId === id;
  });

  return (
    <MovieDetail movie={movie} screenings={movieScreenings}/>
  )
}