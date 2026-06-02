import Image from "next/image";
import styles from "./MovieDetail.module.scss";
import ReviewForm from "./ReviewForm";
import MovieReviews from "./MovieDetailReviews";
import Link from "next/link";

export default function MovieDetail({ movie, screenings = [] }) {
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
            <p className={styles.detail__description}>{movie.description}</p>
          </div>
        </div>
      </section>

      <section className={styles.screeningsSection}>
        <div>
          <h2>Visningar</h2>

          {screenings.length === 0 ? (
            <p>Det finns inga visningar för den här filmen just nu.</p>
          ) : (
            <div className={styles.screeningsSection__list}>
              {screenings.map((screening) => (
                <article
                  key={screening._id}
                  className={styles.screeningsSection__item}
                >
                  <div>
                    <p>
                      {new Intl.DateTimeFormat("sv-SE", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(screening.startTime))}
                    </p>

                    <p>
                      Salong: {screening.room} · Lediga platser:{" "}
                      {screening.availableSeats}
                    </p>
                  </div>


                  <Link
                    href={`/booking/${screening._id}`}
                    className={styles.screeningsSection__button}
                  >
                    Välj biljetter
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className={styles.reviewsSection}>
        <h2>Har du sett filmen?</h2>
        <MovieReviews movieId={movie._id} />
      </section>
    </main>
  );
}
