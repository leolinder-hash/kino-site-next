"use client"

import { useState } from "react";
import styles from "./Payment.module.scss";
import Image from "next/image";

export default function Payment({
  movieTitle,
  movieImage,
  price,
  seats
}) {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [error, setError] = useState("");

  function handlePayment() {
    if (!selectedMethod) {
      setError("Välj ett betalningsalternativ");
      return;
    }

    setError("");
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
        >
          Betala
        </button>
      </div>
    </section >
  )
}