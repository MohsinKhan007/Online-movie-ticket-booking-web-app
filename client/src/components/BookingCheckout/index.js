import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { loadStripe } from '@stripe/stripe-js';
require('dotenv').config();
import axios from '../../axios';

import classes from './BookingCheckout.module.css';
import ReservationContext from '../../Store/ReservationContext';
import AuthContext from '../../Store/AuthContext';
import sendEmail from '../../utils/sendEmail';
import { removeLocalStorage } from '../../utils/localStorage';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY_PUBLISHABLE);

function BookingCheckout({ setShowModal }) {
  const [reservation] = useContext(ReservationContext);
  const [authStatus] = useContext(AuthContext);
  if(setShowModal){
// console.log("BookingCheckout Component",setShowModal);
  }
  const { t } = useTranslation();

  const handleCheckout = async () => {
    // Check if user has selected seats before checkout
    console.log("handleCheckout handleCheckout");
    console.log("STRIPE KEY  ",process.env.REACT_APP_STRIPE_KEY_PUBLISHABLE);

    if (reservation.selectedSeats.length === 0) {
      setShowModal({
        status: true,
        type: 'close',
        subject: 'Info',
        message: 'select_min_seat_message'
      });
    }
   
    // Check if user is logged in before checkout
    else if (!authStatus.isLoggedIn) {
      setShowModal({
        status: true,
        type: 'sign_in',
        subject: 'Info',
        message: 'not_signedin_message'
      });
    } else {
      const stripe = await stripePromise;
      console.log("hello stripe");
      // Create a Stripe session on server and reserve seats
      try {
        console.log("axios request");
        const response = await axios({
          method: 'post',
          url: '/reservation',
          data: reservation
        });

        console.log(response," response");

        // idr check karna
        const { reservationId, sessionId } = response.data;

        console.log("reservation Id   ",reservationId );

        // Remove reservation and selected seats from local storage before proceeding to sripe payment
        if (reservationId) {
          removeLocalStorage('reservation');
          removeLocalStorage('reservedSeats');
        }
        // Send email txo user after ticket has been booked
        // check the Email
        // await sendEmail(setShowModal);

        // Redirect to stripe hosted checkout page
        await stripe.redirectToCheckout({
          sessionId
        });
      } catch(e) {
        console.log("BookingCheckout Component", e)
        setShowModal({
          status: true,
          type: 'close',
          subject: 'error',
          message: 'Something Wrong'
        });
      }
    }
  };

  return (
    <div className={classes.checkout}>
      <div className={classes.checkout_buttons}>
        <Link to="/">
          <button className={classes.checkout_button} type="button">
            cancel
          </button>
        </Link>
        <Link to="/booking">
          <button
            className={classes.checkout_button}
            type="button"
            onClick={handleCheckout}
            // data-bs-toggle="modal"
            // data-bs-target="#exampleModal"
          >
            checkout
          </button>
        </Link>


      </div>
    </div>
  );
}

export default BookingCheckout;
