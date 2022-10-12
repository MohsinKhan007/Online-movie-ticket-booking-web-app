const mongoose = require('mongoose');
require('dotenv').config();

const { ObjectId } = mongoose.Types;

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Reservation = require('../models/reservation');
const AppError = require('../utils/appError');
  
// To generate a checkout session
exports.createCheckoutSession = async (req, res, next) => {
  const { movie, totalPrice, emailId, movieImg, reservationId } = req.body;

// console.log("Stripe secret KEy: ",process.env.STRIPE_PUBLISH_KEY);
// console.log(cre)
console.log("Create Checkout Session ");

  // console.log("host  ", req.get(`host`));

  // console.log("Whole Body ",req.body);

  // console.log(movie," Movie");

  // console.log(totalPrice," Total Price");

  // console.log(emailId," Email ID");

  // console.log(movieImg," Movie id");

  // console.log(reservationId," reservation ID");

  // console.log("Stripe checkout session",stripe);


  const CHECKOUT_SESSION_ID=reservationId;


  try {
    console.log("try stripe");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: emailId,
      client_reference_id: reservationId,
      line_items: [
        {
          amount: totalPrice *10,
          currency: 'sek',
          name: movie,
          quantity: 1,
          images: [movieImg]
        }
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/payment-success?session_id=${CHECKOUT_SESSION_ID}`,
      // success_url: `http://${req.get(
      //   'client'
      // )}/payment-success?session_id=${CHECKOUT_SESSION_ID}`,
      cancel_url: `http://${req.get('host')}/payment-failure`
    });
    console.log("Session   ",session.id);
    res.status(201).json({
      reservationId,
      sessionId: session.id
    });
  } catch(e) {
    console.log(e);
    next(new AppError('Unable to create movie at the moment', 400));
  }
};

// Stripe payment event handler - Check checkout.session.completed event
exports.stripeEventHandler = async (req, res, next) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  const sig = req.headers['stripe-signature'];
  let event;

  // Verify stripe signature
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  // Handle the payment successfull event and update payment status to 'Success'
  if (event.type === 'checkout.session.completed') {
    const reservationId = event.data.object.client_reference_id;

    try {
      await Reservation.updateOne(
        { _id: ObjectId(reservationId) },
        { $set: { paymentStatus: 'Success' } }
      );
    } catch {
      return next(new AppError('Unable to create movie at the moment', 400));
    }
  }

  return res.status(200).json({ received: true });
};
