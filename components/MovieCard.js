import Image from "next/image";
import Link from "next/link";
import styles from "./MovieCard.module.scss";

export default function MovieCard({ movie }) {
  return (
    <article className={styles.card}>
      <Image
        className={styles.card__image}
        src={movie.image}
        width={300}
        height={350}
        alt={`Poster for ${movie.title}`}
      />
      <div className={styles.card__details}>
        <h2>{movie.title}</h2>
        <div className={styles.card__header}>
          <p className={styles.card__genre}>
            {movie.genre.join(", ")}
          </p>
          <span className={styles.card__ageLimit}>
            {`${movie.ageLimit}+`}
          </span>
        </div>
        <p className={styles.card__description}>
          {movie.description}</p>
      </div>

      <Link
        className={styles.card__button}
        href={`/movies/${movie._id}`}>
        Boka nu
      </Link>
    </article>
  )
}