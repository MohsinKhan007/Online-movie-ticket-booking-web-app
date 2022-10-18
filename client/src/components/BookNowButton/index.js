import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useBookNow from '../../hooks/useBookNow';

import classes from './BookNowButton.module.css';

function BookNowButton({ movie }) {
  const { t } = useTranslation();
  const { handleBookNow } = useBookNow();

  return (
    <Link
      to={{
        pathname: `/showtimings/${movie._id}`
      }}
      className={classes.nav_booknow_btn}>
      <button
        type="button"
        className={classes.book_btn}
        data-testid='BookNowButton'
        style={{fontSize:'1rem',fontWeight:'400',borderRadius:'5px'}}
        onClick={() => handleBookNow(movie)}>
        Book Now
      </button>
    </Link>
  );
}

export default BookNowButton;
