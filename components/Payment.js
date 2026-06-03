"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Payment.module.scss";
import Image from "next/image";

export default function Payment({
  screeningId,
  movieTitle,
  movieImage,
  price,
  seats
}) {
  const router = useRouter();

  const [selectedMethod, setSelectedMethod] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedSeats = seats ? seats.split(",").filter(Boolean)
  : [];

  function getBookingPaymentMethod(method) {
    if (method === "cashRegister") {
      return "counter";
    }
    return method;
  }

  async function handlePayment() {
    if (!selectedMethod) {
      setError("Välj ett betalningsalternativ");
      return;
    }
    if(!screeningId || selectedSeats.length === 0){
      setError("bokningsinformation saknas, gå till boka sidan och välj platser igen");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          screeningId,
          seats: selectedSeats,
          deliveryMethod: getBookingPaymentMethod(selectedMethod),
        }),
      });

      const data = await response.json();

      if(!response.ok || !data.success){
        setError(data.error || "Kunde inte skapa bokningen");
        return;
  }
  router.push(`/booking/confirmation/${data.booking._id}`);
}catch{
  setError("Ett fel inträffade vid betalningen, försök igen");
}finally{
  setIsSubmitting(false);
}
  }

  return (
    <section className={styles.payment}>
      
      <h1>Betalning</h1>


      <div className={styles.payment__summary}>
        <div className={styles.payment__summaryDetails}>
          <h2>Din bokning</h2>
          {movieTitle && <p>Film: {movieTitle}</p>}
          {seats && <p>Platser: {seats}</p>}
          {price && <p>Totalt: {price} SEK</p>}
        </div>

        <div className={styles.payment__imageWrapper}>
          {movieImage && (
            <Image
              className={styles.payment__summaryImage}
              src={movieImage}
              alt={`Poster for ${movieTitle}`}
              width={220}
              height={260}
            />
          )}
        </div>
      </div>
      <div className={styles.payment__container}>
        <fieldset className={styles.payment__methods}>
          <legend>Välj betalningsalternativ</legend>
          <label className={styles.payment__option}>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={selectedMethod === "card"}
              onChange={(e) => setSelectedMethod(e.target.value)}
            />
            <span>Kortbetalning</span>
          </label>
          <label className={styles.payment__option}>
            <input
              type="radio"
              name="paymentMethod"
              value="cashRegister"
              checked={selectedMethod === "cashRegister"}
              onChange={(e) => setSelectedMethod(e.target.value)}
            />
            <span>Betala i kassan</span>
          </label>
        </fieldset>

        {error && (
          <p className={styles.payment__error}>
            {error}
          </p>
        )}
        <button
          type="button"
          className={styles.payment__button}
          onClick={handlePayment}
          disabled={isSubmitting}
        >
          {isSubmitting ? "skapar bokning..." : "Betala"}
        </button>
      </div>
    </section >
  );
}