import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import moment from 'moment';
import axios from '../../axios';
import MovieTicket from '../../components/MovieTicket';
import Modal from '../../components/Modal';

import classes from './PaymentSuccess.module.css';

function PaymentSuccess() {
  const [reservation, setReservation] = useState();
  const [showModal, setShowModal] = useState({
    status: false,
    type: '',
    subject: '',
    message: ''
  });

  const { t } = useTranslation();

  // Extract sessionId from url
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');

  console.log(sessionId,"Sucessful check");



  useEffect(() => {
    const getReservation = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `/reservation/${sessionId}`
        });
        setReservation({
          ...response.data.reservation,
          date: moment(response.data.reservation.date)
        });
      } catch(e) {

        console.log("Error  PaymentSucess  ",e)


        setShowModal({
          status: true,
          type: 'close',
          subject: 'error',
          message: 'something_wrong'
        });
      }
    };
    getReservation();
  }, []);

  return (
    <div className={classes.container}>
      {reservation && (
        <div className={classes.message}>
          <h4>
            Hi!
            <span>{` ${reservation.name}`}</span>
          </h4>
          <p>Payment sucessfully received</p>
          <p>Thanks By Simple Movie App</p>
          <p>Print your e-ticket by click ctrl+p and downloading as pdf</p>
          <p>You Unique Ticket Id: {Math.floor(100000000 + Math.random() * 900000000)}</p>
        </div>
      )}
      <div className={classes.movie_ticket}>
        {reservation && <MovieTicket reservation={reservation} />}
      </div>
      <div className={classes.close_button}>
        <Link to="/">
          <button className={classes.checkout_button} type="button">
            close
          </button>
        </Link>
      </div>
      {showModal.status && (
        <Modal showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
}

export default PaymentSuccess;
