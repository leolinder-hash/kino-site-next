'use client';

import { useState, useEffect } from 'react';
import ReviewForm from '@/components/ReviewForm';

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState('');
    const [movieId, setMovieId] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const url = movieId ? `/api/reviews?movieId=${movieId}` : '/api/reviews';
                const res = await fetch(url);
                const data = await res.json();
                if (res.ok) setReviews(data);
            } catch (err) {
                setError('Kunde inte hämta recensioner.');
            }
        };

        fetchReviews();
    }, [movieId]);

    const refreshList = async () => {
        try {
            const url = movieId ? `/api/reviews?movieId=${movieId}` : '/api/reviews';
            const res = await fetch(url);
            const data = await res.json();
            if (res.ok) setReviews(data);
        } catch (err) {
            setError('Kunde inte uppdatera listan.');
        }
    };

    const handleDelete = async (id) => {
        setError('');
        try {
            const res = await fetch(`/api/reviews/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error);
                return;
            }

            refreshList();
        } catch (err) {
            setError('Kunde inte radera recensionen.');
        }
    };

    return (
        <main style={{ maxWidth: '800px', width: '100%', margin: '2rem auto', padding: '0 2rem', fontFamily: 'sans-serif', backgroundColor: 'black', color: 'white' }}>
        <h1 style={{ paddingBottom: '0.5rem' }}>Recensioner Test</h1>

        {error && <p style={{ color: 'white', background: '#9f1717', padding: '1rem', borderRadius: '0.5rem', fontWeight: 'bold' }}>{error}</p>}

        <div style={{ marginBottom: '2rem', background: '#111', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #222' }}>

        <div style={{ marginBottom: '1.2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#888', fontSize: '0.85rem' }}>Test-Användar-ID:</label>
        <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '0.25rem' }}
        />
        </div>
        
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#888', fontSize: '0.85rem' }}>Film-ID:</label>
        <input
        type="text"
        value={movieId}
        onChange={(e) => setMovieId(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '0.25rem' }}
        />
        </div>

        <ReviewForm movieId={movieId} userId={userId} onSuccess={refreshList} />

        <h3>Recensioner</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
        {reviews.length === 0 ? (
            <p style={{ color: '#888' }}>Inga recensioner hittades.</p>
        ) : (
            reviews.map((review) => (
                <li key={review._id} style={{ background: '#111', border: '1px solid #222', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                <p><strong>Betyg:</strong> {review.rating}/5</p>
                <p style={{ fontStyle: 'italic', color: '#ccc', margin: '1rem 0' }}>"{review.reviewText}"</p>
                <button
                onClick={() => handleDelete(review._id)}
                style={{ background: '#222', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}
                >
                Ta bort
                </button>
                </li>
            ))
        )}
        </ul>
        </main>
    );
}
