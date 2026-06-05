"use client";

import { useState } from "react";
import styles from "./SeatSelection.module.scss";
import Link from "next/link";


const ticketTypes = [
  {
    id: "regular",
    label: "Ordinarie",
    price: 189,
  },
  {
    id: "student",
    label: "Student",
    price: 129,
  },
  {
    id: "child",
    label: "Barn",
    price: 110,
  },
];

const MAX_TICKETS = 5;

function getSeatLabel(seat) {
  return `${seat.row}${seat.number}`;
}
function getSeatGroup(startSeat, seats, amount) {
  if (!startSeat || amount === 0) {
    return [];
  }

  const sameRowSeats = seats
    .filter((seat) => seat.row === startSeat.row)
    .sort((a, b) => a.number - b.number);

  const startIndex = sameRowSeats.findIndex(
    (seat) => seat.number === startSeat.number
  );

  if (startIndex === -1) {
    return [];
  }

  const group = sameRowSeats.slice(startIndex, startIndex + amount);

  if (group.length < amount) {
    return [];
  }

  const hasBookedSeat = group.some((seat) => seat.isBooked);

  if (hasBookedSeat) {
    return [];
  }

  return group.map((seat) => getSeatLabel(seat));
}
export default function SeatSelection({ seats = [], screeningId, movieTitle, moviePoster }) {
  const [ticketCounts, setTicketCounts] = useState({
    regular: 0,
    student: 0,
    child: 0,
  });

  const [hoveredSeat, setHoveredSeat] = useState(null);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const totalTickets = Object.values(ticketCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  const totalPrice = ticketTypes.reduce((sum, ticketType) => {
    return sum + ticketCounts[ticketType.id] * ticketType.price;
  }, 0);

  function updateTicketCount(ticketTypeId, change) {
    const currentCount = ticketCounts[ticketTypeId];
    const nextCount = currentCount + change;
    const nextTotalTickets = totalTickets + change;

    if (nextCount < 0) {
      return;
    }

    if (nextTotalTickets > MAX_TICKETS) {
      return;
    }

    setTicketCounts((currentTicketCounts) => ({
      ...currentTicketCounts,
      [ticketTypeId]: nextCount,
    }));

    if (change < 0 && selectedSeats.length > nextTotalTickets) {
      setSelectedSeats((currentSelectedSeats) =>
        currentSelectedSeats.slice(0, nextTotalTickets)
      );
    }
  }

  function handleSeatClick(seat) {
    if (seat.isBooked) {
      return;
    }

    if (totalTickets === 0) {
      return;
    }

    const seatsToSelect = getSeatGroup(seat, seats, totalTickets);

    if (seatsToSelect.length !== totalTickets) {
      return;
    }
    setSelectedSeats(seatsToSelect);
  }
  const isReadyForPayment =
    totalTickets > 0 && selectedSeats.length === totalTickets;
  const previewSeats = getSeatGroup(hoveredSeat, seats, totalTickets);

  const paymentParams = new URLSearchParams({
    screeningId: screeningId || "",
    movie: movieTitle || "",
    image: moviePoster || "",
    price: String(totalPrice),
    seats: selectedSeats.join(","),
  });

  return (
    <section className={styles.bookingFlow}>
      <section className={styles.ticketBox}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Steg 1</p>
          <h2>Välj antal biljetter</h2>
        </div>

        <div className={styles.ticketList}>
          {ticketTypes.map((ticketType) => (
            <div key={ticketType.id} className={styles.ticketRow}>
              <div>
                <h3>{ticketType.label}</h3>
                <p>{ticketType.price} SEK</p>
              </div>

              <div className={styles.counter}>
                <button
                  type="button"
                  onClick={() => updateTicketCount(ticketType.id, -1)}
                  disabled={ticketCounts[ticketType.id] === 0}
                  aria-label={`Minska antal ${ticketType.label}`}
                >
                  −
                </button>

                <span>{ticketCounts[ticketType.id]}</span>

                <button
                  type="button"
                  onClick={() => updateTicketCount(ticketType.id, 1)}
                  disabled={totalTickets >= MAX_TICKETS}
                  aria-label={`Öka antal ${ticketType.label}`}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className={styles.ticketLimit}>
          Du kan välja max {MAX_TICKETS} biljetter.
        </p>
      </section>

      <section className={styles.seatSelection}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Steg 2</p>
          <h2>Välj platser</h2>
        </div>

        {totalTickets === 0 && (
          <p className={styles.infoMessage}>
            Välj antal biljetter innan du väljer platser.
          </p>
        )}

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
              const isPreview = previewSeats.includes(seatLabel);

              let seatClassName = styles.seat;

              if (seat.isBooked) {
                seatClassName += ` ${styles.booked}`;
              } else if (isSelected) {
                seatClassName += ` ${styles.selected}`;
              } else if (isPreview) {
                seatClassName += ` ${styles.preview}`;
              } else {
                seatClassName += ` ${styles.available}`;
              }

              return (
                <button
                  key={seat._id || `${seat.row}-${seat.number}`}
                  type="button"
                  className={seatClassName}
                  onClick={() => handleSeatClick(seat)}
                  onMouseEnter={() => setHoveredSeat(seat)}
                  onMouseLeave={() => setHoveredSeat(null)}
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
      </section>

      <section className={styles.summary}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Steg 3</p>
          <h2>Se allt rätt ut?</h2>
        </div>

        {totalTickets === 0 ? (
          <p className={styles.noSeats}>
            Du har inte valt några biljetter ännu.
          </p>
        ) : (
          <div className={styles.summaryList}>
            {ticketTypes.map((ticketType) => {
              const count = ticketCounts[ticketType.id];

              if (count === 0) {
                return null;
              }

              return (
                <div key={ticketType.id} className={styles.summaryRow}>
                  <span>
                    {count}x {ticketType.label.toLowerCase()}
                  </span>

                  <span>{count * ticketType.price} SEK</span>
                </div>
              );
            })}

            <div className={styles.summaryRow}>
              <span>Valda platser</span>
              <span>
                {selectedSeats.length > 0 ? selectedSeats.join(", ") : "Inga"}
              </span>
            </div>
          </div>
        )}

        {totalTickets > 0 && selectedSeats.length !== totalTickets && (
          <p className={styles.warning}>
            Du har valt {selectedSeats.length} av {totalTickets} platser.
          </p>
        )}

        <div className={styles.totalRow}>
          <strong>Totalt:</strong>
          <strong>{totalPrice} SEK</strong>
        </div>

        {isReadyForPayment ? (
          <Link
            href={`/payment?${paymentParams.toString()}`}
            className={styles.paymentButton}
          >
            Fortsätt till betalning
          </Link>
        ) : (
          <button type="button" className={styles.paymentButton} disabled>
            Fortsätt till betalning
          </button>
        )}
      </section>
    </section>
  );
}
