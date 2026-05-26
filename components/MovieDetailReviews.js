'use client';

import { useState, useEffect } from 'react';
import styles from './MovieReviews.module.scss';

export default function MovieReviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getReviews() {
      setLoading(true);
      try {
        const res = await fetch('/api/reviews?movieId=' + movieId);
        const data = await res.json();

        if (res.ok) {
          setReviews(data);
        } else {
          setError('Kunde inte hämta recensioner.');
        }
      } catch (err) {
        setError('Något gick fel.');
      }

      setLoading(false);
    }

    getReviews();
  }, [movieId]);

  let total = 0;
  for (let i = 0; i < reviews.length; i++) {
    total = total + reviews[i].rating;
  }

  let average = 0;
  if (reviews.length > 0) {
    average = total / reviews.length;
  }

  function makeStars(rating) {
    let stars = "";
    const rounded = Math.round(rating);
    stars = '★'.repeat(rounded) + '☆'.repeat(5 - rounded);
    return stars
  }


  if (loading) {
    return (
      <section className={styles.reviews}>
        <p className={styles.reviews__status}>Laddar recensioner...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.reviews}>
        <p className={styles.reviews__error}>{error}</p>
      </section>
    );
  }

  return (
    <section className={styles.reviews}>
      <div className={styles.reviews__header}>
        <h2 className={styles.reviews__title}>Recensioner</h2>
        {reviews.length > 0 && (
          <div className={styles.reviews__summary}>
            <span className={styles.reviews__average}>
              {makeStars(average)} {average.toFixed(1)}/5
            </span>
            <span className={styles.reviews__count}>
              {reviews.length} recensioner
            </span>
          </div>
        )}
      </div>

      {reviews.length === 0 ? (
        <p className={styles.reviews__empty}>
          Inga recensioner ännu. Bli den första att recensera denna film!
        </p>
      ) : (
        <ul className={styles.reviews__list}>
          {reviews.map((review) => {
            let username = 'Anonym användare';
            if (review.user && review.user.username) {
              username = review.user.username;
            }

            let date = '';
            if (review.createdAt) {
              date = new Date(review.createdAt).toLocaleDateString('sv-SE');
            }

            return (
              <li key={review._id} className={styles.review}>
                <div className={styles.review__header}>
                  <span className={styles.review__user}>{username}</span>
                  <span className={styles.review__date}>{date}</span>
                </div>
                <div className={styles.review__rating}>
                  {makeStars(review.rating)} {review.rating}/5
                </div>
                <p className={styles.review__text}>{review.reviewText}</p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
