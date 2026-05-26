import Image from "next/image";
import styles from "./MovieDetail.module.scss"
import ReviewForm from "./ReviewForm";
import MovieReviews from "./MovieDetailReviews";

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
        </div>
      </section>

      <section className={styles.screeningsSection}>
        <div>
          <h2>Visningar</h2>
          {/* LÄGG IN SCREENINGSKOMPONENT */}

          <button className={styles.screeningsSection__button}>
            Välj biljetter
          </button>
        </div>
      </section>

      <section className={styles.reviewsSection}>
        <MovieReviews movieId={movie._id} />
        <h2>Har du sett filmen?</h2>
        <ReviewForm
          movieId={movie._id}
        />
      </section>
    </main >
  )
}