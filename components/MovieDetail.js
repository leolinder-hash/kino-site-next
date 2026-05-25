import Image from "next/image";
import styles from "./MovieDetail.module.scss"

export default function MovieDetail({ movie }) {
  return (
    <div>
      <h1>{movie.title}</h1>
      <Image
        src={movie.image}
        width={300}
        height={340}
        alt={`Poster for ${movie.title}`}
      />
      <p>Genre: {movie.genre.join(", ")}</p>
      <p>Längd: {movie.duration} min</p>
      <span>Ålder: {movie.ageLimit}+</span>
      <p>{movie.description}</p>

      <h2>Visningar</h2>
      {/* LÄGG IN SCREENINGSKOMPONENT */}

      <button>Välj biljetter</button>
    </div>
  )
}