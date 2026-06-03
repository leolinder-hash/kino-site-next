import Image from "next/image";
import link from "next/link";
import { notFound } from "next/navigation";
import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import "@/models/Screening";
import "@/models/Movie";
import styles from "./page.module.scss";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function formatDateTime(date) {
    return new Intl.DateTimeFormat("sv-SE", {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
}

function formatDeliveryMethod(method) {
    const methods = {
        email: "E-post",
        sms: "E-biljett via SMS",
        pickup: "Hämtas ut i kassan",
    };
    return methods[method] || method;
}

function formatPaymentMethod(method) {
    const methods = {
        card: "Kort",
        swish: "Swish",
        giftcard: "Presentkort",
        counter: "Betala i kassan",
    };
    return methods[method] || method;
}

export default async function BookingConfirmationPage({ params }) {
    const { bookingId } = await params;
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        notFound();
    }
    await connectDB();
    const booking = await Booking.findById(bookingId)
        .populate({
            path:"screeningId",
            populate: {
                path: "movie",
            },
        })
        .lean();

        if(!booking || !booking.screeningId || !booking.screeningId.movie){
            notFound();
        }

        const safeBooking = JSON.parse(JSON.stringify(booking));
        const screening = safeBooking.screeningId;
        const movie = screening.movie;

        return (
            <main className={styles.confirmationPage}>
                <section className={styles.hero}>
                    <p className = {styles.eyebrow}>Bokningsbekräftelse</p>
                    <h1>Tack för din bokning!</h1>
                    <p className={styles.confirmationMessage}>
                        Din bokning har genomförts och en bekräftelse har skickats till din e-post. Dina platser är reserverade, spara gärna bokningsnumret nedan.
                    </p>
                </section>

                <section className = {styles.card}>
                    <div className={styles.posterWrapper}>
                        <Image
                            src={movie.image || "/kino-logo-v2.png"}
                            alt={`Poster for ${movie.title}`}
                            width={180}
                            height={250}
                            className={styles.poster}
                        />
                    </div>

                    <div className={styles.details}>
                        <div className = {styles.statusRow}>
                            <span className={styles.badge}>Bekräftad</span>
                            <span className = {styles.reference}>Bokningsnummer: {safeBooking._id}
                            </span>
                    </div>
                        </div>
                        <h2>{movie.title}</h2>
                        <div className = {styles.infoGrid}>
                            <div>
                                <span>Datum och tid</span>
                                <strong>{formatDateTime(screening.startTime)}</strong>
                            </div>
                            <div>
                                <span>Salong</span>
                                <strong>{screening.room}</strong>
                            </div>
                            <div>
                                <span>Platser</span>
                                <strong>{safeBooking.seats.join(", ")}</strong>
                            </div>
                            <div>
                                <span>Antal platser</span>
                                <strong>{safeBooking.seats.length}</strong>
                            </div>
                            <div>
                                <span>Leveransmetod</span>
                                <strong>{formatDeliveryMethod(safeBooking.deliveryMethod)}</strong>
                            </div>
                            <div>
                                <span>Betalsätt</span>
                                <strong>{formatPaymentMethod(safeBooking.paymentMethod)}</strong>
                            </div>
                            <p className={styles.savedText}>
                                Bokningen skapades {formatDateTime(safeBooking.bookingDate)}.
                            </p>
                        </div>
                </section>
                <section className={styles.actions}>
                    <link href="/" className={styles.primaryLink}>
                    Tillbaka till startsidan
                    </link>

                    <link href="/my-bookings" className={styles.secondaryLink}>
                    Se mina bokningar
                    </link>
                </section>
            </main>
        );
}
                