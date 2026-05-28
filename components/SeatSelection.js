"use client";

import { useState } from "react";
import styles from "./SeatSelection.module.scss";

function getSeatLabel(seat) {
  return `${seat.row}${seat.number}`;
}

export default function SeatSelection({ seats = [], screeningId }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  function handleSeatClick(seat) {
    if (seat.isBooked) {
      return;
    }

    const seatLabel = getSeatLabel(seat);

    setSelectedSeats((currentSelectedSeats) => {
      if (currentSelectedSeats.includes(seatLabel)) {
        return currentSelectedSeats.filter((seat) => seat !== seatLabel);
      }

      return [...currentSelectedSeats, seatLabel];
    });
  }

  const hasSelectedSeats = selectedSeats.length > 0;

  return (
    <section className={styles.seatSelection}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Välj platser</p>
          <h2>Platser</h2>
        </div>

        <p className={styles.helpText}>
          Välj en eller flera lediga platser.
        </p>
      </div>

      <div className={styles.screen}>Duk</div>

      {seats.length === 0 ? (
        <p className={styles.empty}>
          Det finns inga platser för den här visningen.
        </p>
      ) : (
        <div className={styles.grid}>
          {seats.map((seat) => {
            const seatLabel = getSeatLabel(seat);
            const isSelected = selectedSeats.includes(seatLabel);

            let seatClassName = styles.seat;

            if (seat.isBooked) {
              seatClassName += ` ${styles.booked}`;
            } else if (isSelected) {
              seatClassName += ` ${styles.selected}`;
            } else {
              seatClassName += ` ${styles.available}`;
            }

            return (
              <button
                key={`${seat.row}-${seat.number}`}
                type="button"
                className={seatClassName}
                onClick={() => handleSeatClick(seat)}
                disabled={seat.isBooked}
                aria-pressed={isSelected}
                aria-label={
                  seat.isBooked
                    ? `Plats ${seatLabel} är upptagen`
                    : isSelected
                    ? `Plats ${seatLabel} är vald`
                    : `Välj plats ${seatLabel}`
                }
              >
                {seatLabel}
              </button>
            );
          })}
        </div>
      )}

      <div className={styles.legend}>
        <span>
          <i className={styles.availableBox}></i>
          Ledig
        </span>

        <span>
          <i className={styles.selectedBox}></i>
          Vald
        </span>

        <span>
          <i className={styles.bookedBox}></i>
          Upptagen
        </span>
      </div>

      <section className={styles.summary}>
        <h3>Dina valda platser</h3>

        {hasSelectedSeats ? (
          <p>{selectedSeats.join(", ")}</p>
        ) : (
          <p className={styles.noSeats}>Du har inte valt några platser ännu.</p>
        )}

        <button
          type="button"
          className={styles.bookingButton}
          disabled={!hasSelectedSeats}
        >
          Fortsätt till bokning
        </button>
      </section>
    </section>
  );
}