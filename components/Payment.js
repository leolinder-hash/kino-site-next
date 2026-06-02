import styles from "./Payment.module.scss";

export default function Payment() {
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
          />
          <span>Kortbetalning</span>
        </label>
        <label className={styles.payment__option}>
          <input
            type="radio"
            name="paymentMethod"
            value="cashRegister"
          />
          <span>Betala i kassan</span>
        </label>
      </fieldset>
      <button
        type="button"
        className={styles.payment__button}>
        Betala
      </button>
    </section >
  )
}