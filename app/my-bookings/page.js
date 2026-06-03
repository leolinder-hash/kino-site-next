"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  async function fetchBookings() {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings");
      if (res.status === 401) {
        setAuthenticated(false);
        setLoading(false);
        return;
      }
      
      const data = await res.json();
      if (res.ok && data.success) {
        setBookings(data.bookings);
      } else {
        setError(data.error || "Kunde inte hämta bokningar.");
      }
    } catch (err) {
      setError("Ett nätverksfel uppstod. Försök igen.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  async function handleCancel(bookingId) {
    if (!confirm("Är du säker på att du vill avboka den här visningen?")) {
      return;
    }
    
    setCancellingId(bookingId);
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        // Update status in local state
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId ? { ...b, status: "cancelled" } : b
          )
        );
      } else {
        alert(data.error || "Kunde inte avboka. Försök igen.");
      }
    } catch (err) {
      alert("Nätverksfel. Kunde inte avboka.");
    } finally {
      setCancellingId(null);
    }
  }

  function formatDateTime(dateString) {
    if (!dateString) return "";
    try {
      return new Intl.DateTimeFormat("sv-SE", {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(dateString));
    } catch (e) {
      return dateString;
    }
  }

  function canCancel(startTime) {
    if (!startTime) return false;
    return new Date(startTime) > new Date();
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.status}>Laddar dina bokningar...</div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Mina bokningar</h1>
          <p className={styles.message}>
            Du måste vara inloggad för att se och hantera dina bokningar.
          </p>
          <Link href="/login" className={styles.button}>
            Logga in här
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mina bokningar</h1>
      
      {error && <div className={styles.error}>{error}</div>}
      
      {bookings.length === 0 ? (
        <div className={styles.empty}>
          <p>Du har inga bokningar ännu.</p>
          <Link href="/movies" className={styles.button}>
            Se aktuella filmer
          </Link>
        </div>
      ) : (
        <div className={styles.list}>
          {bookings.map((booking) => {
            const screening = booking.screeningId || {};
            const movie = screening.movie || {};
            const isConfirmed = booking.status === "confirmed";
            const cancellable = isConfirmed && canCancel(screening.startTime);

            return (
              <div
                key={booking._id}
                className={`${styles.bookingCard} ${
                  !isConfirmed ? styles.cancelledCard : ""
                }`}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={movie.image || "/kino-logo-v2.png"}
                    alt={movie.title || "Filmaffisch"}
                    width={120}
                    height={160}
                    className={styles.image}
                  />
                </div>
                
                <div className={styles.details}>
                  <div className={styles.header}>
                    <h2 className={styles.movieTitle}>
                      {movie.title || "Okänd film"}
                    </h2>
                    <span
                      className={`${styles.badge} ${
                        isConfirmed ? styles.badgeConfirmed : styles.badgeCancelled
                      }`}
                    >
                      {isConfirmed ? "Bekräftad" : "Avbokad"}
                    </span>
                  </div>

                  <p className={styles.time}>
                    <strong>Tid:</strong> {formatDateTime(screening.startTime)}
                  </p>
                  <p className={styles.room}>
                    <strong>Salong:</strong> {screening.room || "Okänd salong"}
                  </p>
                  <p className={styles.seats}>
                    <strong>Platser:</strong> {booking.seats ? booking.seats.join(", ") : ""}
                  </p>
                  <p className={styles.bookingId}>
                    <strong>Bokningsnummer:</strong> {booking._id}
                  </p>
                  
                  {cancellable && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      disabled={cancellingId === booking._id}
                      className={styles.cancelBtn}
                    >
                      {cancellingId === booking._id ? "Avbokar..." : "Avboka"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
