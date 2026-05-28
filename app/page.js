import Link from "next/link";
import MovieList from "@/components/MovieList";
import { pickTopRatedMovies } from "@/lib/topRatedMovies";
import styles from "./page.module.scss";

async function fetchJSONmovie_review(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) return null;
  return response.json();
}

export default async function HomePage() {
  const base = process.env.NEXT_PUBLIC_BASE_URL; 

  const [moviesData, reviewsData] = await Promise.all([
    fetchJSONmovie_review(`${base}/api/movies`),
    fetchJSONmovie_review(`${base}/api/reviews`),
  ]);

  const movies = moviesData?.movies ?? [];
  const reviews = Array.isArray(reviewsData) ? reviewsData : [];
  const topRated = pickTopRatedMovies(movies, reviews, 5);

  const customerReviews = [
    {
      text: "Helt fantastisk biokänsla! Bekväma stolar och kristallklar bild.",
      author: "Anna L.",
      stars: 5,
    },
    {
      text: "Bästa stället i Uppsala för en filmkväll. Bistron är ett stort plus.",
      author: "Johan S.",
      stars: 5,
    },
    {
      text: "Mysig stämning och trevlig personal. Kommer definitivt tillbaka.",
      author: "Sara M.",
      stars: 4,
    },
  ];

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.hero__inner}>
          <h1 className={styles.hero__title}>Välkommen till Kino</h1>
          <p className={styles.hero__subtitle}>
            Upplev film som den ska upplevas — på den stora duken.
          </p>
          <Link href="/movies" className={styles.hero__cta}>
            Se alla filmer som visas nu
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Topp 5 just nu</h2>
        {topRated.length > 0 ? (
          <MovieList movies={topRated} paginated={false} />
        ) : (
          <p style={{ textAlign: "center" }}>Inga filmer att visa just nu.</p>
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Upptäck Kino</h2>
        <div className={styles.attractions}>
          <article className={styles.attraction}>
            <h3>Bistron</h3>
            <p>
              Innan eller efter filmen — slå dig ner i vår bistro för en bit mat,
              ett glas vin eller färskt popcorn. Vi serverar lokala råvaror i en
              avslappnad miljö.
            </p>
          </article>
          <article className={styles.attraction}>
            <h3>Evenemang</h3>
            <p>
              Kino är mer än bara film. Vi anordnar regissörsbesök, temakvällar,
              filmklubbar och privata visningar. Håll utkik efter våra kommande
              evenemang.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Vad våra gäster säger</h2>
        <div className={styles.reviews}>
          {customerReviews.map((review) => (
            <article key={review.author} className={styles.review}>
              <div className={styles.review__stars}>
                {"★".repeat(review.stars)}
                {"☆".repeat(5 - review.stars)}
              </div>
              <p className={styles.review__text}>“{review.text}”</p>
              <p className={styles.review__author}>— {review.author}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Hitta hit</h2>
        <div className={styles.map}>
          <p>
            <strong>Karta kommer snart</strong>
            <br />
            Kino ligger vid Uppsala Centralstation.
          </p>
        </div>
      </section>
    </>
  );
}
