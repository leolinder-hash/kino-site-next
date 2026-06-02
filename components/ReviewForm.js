'use client';

import { useState } from 'react';
import styles from './ReviewForm.module.scss';

export default function ReviewForm({ movieId, userId, onSuccess }) {
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!userId) {
            setError('Ange Test-Användar-ID först.');
            return;
        }

        if (!movieId) {
            setError('Systemfel: Inget film-ID kunde identifieras.');
            return;
        }

        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user: userId,
                    movie: movieId,
                    rating: Number(rating),
                    reviewText,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error);
                return;
            }

            setReviewText('');
            setSuccess(true);

            if (onSuccess) onSuccess();

        } catch (err) {
            setError('Ett nätverksfel uppstod. Försök igen.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.title}>Lämna en recension</h3>



            <div className={styles.field}>
                <label className={styles.label}>Ditt betyg</label>

                <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className={styles.star}
                            onClick={() => setRating(star)}
                        >
                            {star <= rating ? "★" : "☆"}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.field}>
                
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>Tack! Din recension har sparats.</p>}

                <label className={styles.label}>Kommentar</label>
                <textarea
                    className={styles.textarea}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Vad tyckte du om filmen?"
                />
            </div>

            <button type="submit" className={styles.button}>
                Skicka recension
            </button>
        </form>
    );
}
