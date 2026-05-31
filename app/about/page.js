import styles from "./page.module.scss";

export default function AboutPage() {
  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.hero__title}>Om Kino</h1>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Story of Kino</h2>
        <p className={styles.section__body}>
          Kinos historia kommer snart att berättas här.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>How to reach</h2>
        <div className={styles.directions}>
          <p>
            Du hittar oss vid <strong>Uppsala Central</strong>.
          </p>
          <p>
            Stationen ligger bara några minuters promenad från entrén — enkelt
            att nå med tåg, buss eller till fots.
          </p>
        </div>
      </section>
    </>
  );
}
