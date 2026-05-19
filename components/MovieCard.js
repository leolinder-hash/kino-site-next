import Image from "next/image";
import Link from "next/link";
import styles from "./MovieCard.module.scss";

export default function MovieCard({ movie }) {
  return (
    <article className={styles.card}>
      <Image
        src={movie.image}
        width={500}
        height={500}
        alt={`Poster for ${movie.title}`}
      />
      <div className={styles.card__details}>
        <h2>{movie.title}</h2>
        <p>{movie.ageLimit}</p>
        <p>{movie.genre.join(", ")}</p>
        <p>{movie.description}</p>
      </div>

      <Link
        href={`/movies/${movie._id}`}>
        Boka nu
      </Link>
    </article>
  )
}