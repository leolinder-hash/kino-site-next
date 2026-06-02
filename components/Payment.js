"use client"

import { useState } from "react";
import styles from "./Payment.module.scss";

export default function Payment() {
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
    </section >
  )
}