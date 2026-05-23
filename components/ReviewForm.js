'use client';

import { useState } from 'react';

export default function ReviewForm({ movieId, userId, onSuccess }) {
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if(!userId) {
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
        <form onSubmit={handleSubmit} style={{ background: '#111', padding: '2rem', borderRadius: '0.5rem', border: '1px solid #222', color: 'white', marginBottom: '2rem' }}>
        <h3 style={{ marginTop: 0 }}>Lämna en recension</h3>

        {error && <p style={{ color: 'white', background: '#9f1717', marginBottom: '0.8rem', marginTop: '0.8rem', padding: '0.8rem', borderRadius: '0.5rem', fontWeight: 'bold' }}>{error}</p>}
        {success && <p style={{ color: 'black', background: '#d9f5b4', marginBottom: '0.8rem', marginTop: '0.8rem', padding: '0.8rem', borderRadius: '0.5rem', fontWeight: 'bold' }}>Tack! Din recension har sparats.</p>}

        <div style={{ marginBottom: '1.2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Ditt betyg (1-5)</label>
        <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        style={{ padding: '0.8rem', background: '#222', border: '1px solid #444', borderRadius: '0.5rem', color: 'white', width: '80px', fontSize: '1rem' }}
        />
        </div>

        <div style={{ marginBottom: '1.2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Kommentar</label>
        <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Vad tyckte du om filmen?"
        style={{ width: '100%', height: '100px', padding: '0.8rem', background: '#222', border: '1px solid #444', borderRadius: '0.5rem', color: 'white', resize: 'vertical', fontSize: '1rem' }}
        />
        </div>

        <button type="submit" style={{ width: '100%', padding: '0.8rem', background: '#9f1717', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', transition: 'background 0.2s' }}>
        Skicka recension
        </button>
        </form>
    );
}
