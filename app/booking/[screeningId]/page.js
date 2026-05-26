import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import mongoose from 'mongoose';
import {connectDB} from '@/lib/mongodb';
import Screening from '@/models/Screening';
import SeatSelection from '@/components/SeatSelection';
import styles from './page.module.scss';

function formatScreeningDate(date) {
    return new Intl.DateTimeFormat('sv-SE', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(date));
}

export default async function BookingPage({params}) {
    const {screeningId} = await params;
    if(!mongoose.Types.ObjectId.isValid(screeningId)){
        notFound();
    }
    await connectDB();
    const screening = await Screening.findById(screeningId)
    .populate('movie').lean();
    if(!screening){
        notFound();
    }
    const safeScreening = JSON.parse(JSON.stringify(screening));
    const movie = safeScreening.movie;
    return (
        <section className={styles.bookingPage}>
            <Link href={`/movies/${movie._id}`} className={styles.backLink}>
             Tillbaka till filmen
             </Link>
             <section className={styles.movieSummary}>
                <div className={styles.movieInfo}>
                    <p className = {styles.eyebrow}>Bokning</p>
                    <h1>{movie.title}</h1>

                    <p className={styles.meta}>
                        {movie.duration} min : {movie.genre?.join( "/ ")} : {movie.ageLimit}+  
                    </p>
                    <p className={styles.screeningTime}>{formatScreeningDate(safeScreening.startTime)}

                    </p>

                    <p className = {styles.room}>Salong: {safeScreening.room}</p>

                </div>
                <Image 
                    src={movie.image || "/kino-logo-v2.png"}
                    alt={`Poster for ${movie.title}`}
                    width={220}
                    height={300}
                    className={styles.poster}
                />
             </section>
             <SeatSelection seats={safeScreening.seats}/>
             <section className={styles.bookingActions}>
                <p>
                    Platsvaelt visar här som grund, men ska ändras i nästa issue så att platserna blir klickbara och kopplar platser till bokningsknappen.
                </p>
                <button type="button" disabled>
                    Fortsätt till bokning
                </button>
        </section>
        </section>
    );
}