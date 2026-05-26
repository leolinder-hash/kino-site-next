import styles from './SeatSelection.module.scss';

function getSeatLabel(seat){
    return `${seat.row}${seat.number}`; 
}

export default function SeatSelection({seats = []}){
    return(
        <section className={styles.seatSelection}>
                <div className = {styles.header}>
                <div>
                <p className = {styles.eyebrow}>Välj dina platser</p>
                <h2>Platser</h2>
                </div>
                <p className = {styles.helpText}>
                    Klickbart platsval kommer i nästa issue
                </p>
                </div>

                <div className={styles.screen}>Duk</div>      

                {seats.length === 0 ? (
                    <p className={styles.empty}>Det finns inga platser för den här visningen.</p>
                ) : (
                    <div className={styles.grid}>
                        {seats.map((seat) => (
                            <div
                            key={`${seat.row}-${seat.number}`}
                            className={
                                seat.isBooked
                                ? `${styles.seat} ${styles.booked}`
                                : `${styles.seat} ${styles.available}`
                            }
                            title={getSeatLabel(seat)}
                            >
                                {getSeatLabel(seat)}
                            </div>
                        ))}
                    </div>
                )}
                <div className = {styles.legend}>
                    <span>
                        <i className={styles.availableBox}></i> 
                        Ledig   
                    </span>   
                    <span>
                        <i className={styles.bookedBox}></i>
                        Upptagen    
                    </span> 
                    </div>      
        </section>
    );
}