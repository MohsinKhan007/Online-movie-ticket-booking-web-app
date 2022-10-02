import React from 'react';
import { useTranslation } from 'react-i18next';
import truncate from '../../utils/truncate';
import classes from './MovieTicket.module.css';

function MovieTicket({ reservation }) {
  // const { t } = useTranslation();

  return (
    <div className={classes.cardWrap}>
      <div style={{width:'26em'}} className={`${classes.card} ${classes.cardLeft}`}>
        <h1>The Simple Cinema</h1>
        <div  style={{display:'flex'}} className={classes.title}>
          <h2 style={{ marginRight:'5px'}}>{truncate(reservation.movie, 30)}</h2>
          <span>movie</span>
        </div>
        <div className={classes.name} style={{display:'flex'}}>
          <h2 style={{ marginRight:'5px'}}>{reservation.name}</h2>
          <span>name</span>
        </div>
        <div className={classes.date}>
          <h2>{reservation.date.format('YYYY-MM-DD')}</h2>
          <span>date</span>
        </div>
        <div className={classes.time}>
          <h2>{reservation.startAt}</h2>
          <span>time</span>
        </div>
        <div className={classes.seat}>
          <div className={classes.seats}>
            {reservation.selectedSeats.map((seat) => {
              return <h2 key={seat}>{seat}</h2>;
            })}
          </div>
          <span>seats</span>
        </div>
      </div>
      <div className={`${classes.card} ${classes.cardRight}`} style={{width:'21em'}}>
        <div className={classes.eye} />
        <div className={classes.screen}>
          <h3>{reservation.selectedCinema}</h3>
          <span>screen</span>
        </div>
        <div style={{display:'flex'}}>
        <div className={classes.price}>
          <h3>{`${reservation.totalPrice} SEK`}</h3>
          <span>total</span>
        </div>
        <div className={classes.barcode} />
      </div>
      </div>
    </div>
  );
}

export default MovieTicket;
