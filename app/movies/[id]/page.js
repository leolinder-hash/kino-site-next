import { notFound } from "next/navigation";
import MovieDetail from "@/components/MovieDetail";

export default async function MovieDetailPage({ params }) {
  const { id } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${baseUrl}/api/movies/${id}`);

  if (!response.ok) {
    notFound();
  }

  const { movie } = await response.json();

  return (
    <MovieDetail movie={movie} />
  )
}