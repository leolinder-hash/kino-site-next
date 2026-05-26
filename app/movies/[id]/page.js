import { notFound } from "next/navigation";
import MovieDetail from "@/components/MovieDetail";

export default async function MovieDetailPage({ params }) {
  const { id } = await params;
  const url = `http://localhost:3000/api/movies/${id}`;

  const response = await fetch(url);

  if (!response.ok) {
    notFound();
  }

  const { movie } = await response.json();

  return (
    <MovieDetail movie={movie} />
  )
}