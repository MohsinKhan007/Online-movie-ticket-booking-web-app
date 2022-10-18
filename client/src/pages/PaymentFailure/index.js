import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import classes from './PaymentFailure.module.css';

function PaymentFailure() {
 

  return (
    <div className={classes.container}>
      <div className={classes.message}>
        <p>Payment_failed</p>
        <p>Try Again</p>
      </div>

      <div className={classes.close_button}>
        <Link to="/">
          <button className={classes.checkout_button} type="button">
            close
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PaymentFailure;
