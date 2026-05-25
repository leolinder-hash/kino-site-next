import Image from "next/image";
import styles from "./MovieDetail.module.scss"
import ReviewForm from "./ReviewForm";

export default function MovieDetail({ movie }) {
  return (
    <main className={styles.movieDetailPage}>
      <section className={styles.detail}>

        <div className={styles.detail__imageWrapper}>
          <Image
            src={movie.image}
            width={300}
            height={400}
            alt={`Poster for ${movie.title}`}
          />
        </div>

        <div className={styles.detail__content}>

          <h1>{movie.title}</h1>

          <div className={styles.detail__meta}>
            <span>Genre: {movie.genre.join(", ")}</span>
            <span>Längd: {movie.duration} min</span>
            <span>Ålder: {movie.ageLimit}+</span>
          </div>

          <div className={styles.detail__descriptionSection}>
            <h3>Om filmen</h3>
            <p className={styles.detail__description}>
              {movie.description}
            </p>
          </div>

          <h2>Visningar</h2>
          {/* LÄGG IN SCREENINGSKOMPONENT */}

          <button className={styles.detail__button}>
            Välj biljetter
          </button>
        </div>
      </section>

      <section className={styles.reviewsSection}>
        <ReviewForm
          movieId={movie._id}
        />
      </section>
    </main >
  )
}