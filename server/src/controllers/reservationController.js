const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
const Reservation = require('../models/reservation');
const AppError = require('../utils/appError');
const { updateShowTiming } = require('./showTimingController');

// To create a reservation
exports.createReservation = async (req, res, next) => {
  req.body.date = new Date(req.body.date);
  try {
    console.log("Body of reservation saved");
    console.log(req.body);

    const totalSeats=req.body.selectedSeats.length;

    const reservationObject={
      date:req.body.date,
      startAt :req.body.startAt,
      selectedSeats: req.body.selectedSeats,
      totalSeats:totalSeats,
      movieId: req.body.movieId ,
      movie: req.body.movie,
      screenId :req.body.screenId,
      selectedCinema :req.body.selectedCinema,
      totalPrice:req.body.totalPrice,
      name:req.body.name,
      emailId:req.body.emailId,
      paymentStatus:req.body.paymentStatus
    };
    
  
    const reservation = new Reservation(reservationObject);

    reservation.save((err,doc)=>{
      if(err|| !doc){
        next(new AppError('Unable to reserve at the moment', 400));
      }
      else{

        console.log("Create reservation called");
        // Update reserved seats in showTiming collection for this specific show
    
        console.log(req.body.reservationId," Newly made reservation ID");
    
        req.body.reservationId = reservation._id.toString();
        updateShowTiming(req, res, next);
        console.log("added sucessfully");


        console.log("reservation");
        console.log(reservation);


      }
    });

    // if(await reservation.save()){
    //   console.log("reservation saved");
    // }

  } catch(e){
    console.log(e);
    next(new AppError('Unable to reserve at the moment', 400));
  }
};

// To get all reservations of a user
exports.getAllReservations = async (req, res, next) => {

  console.log("hello");

  const { startAt, screenId, date } = req.query;
  console.log(new Date(req.query.date)," Date");
  console.log(new Date(date)," Date");
  try {
    const reservations = await Reservation.find({
      startAt: { $eq: startAt },
      screenId: { $eq: screenId },
      // date: new Date(date)
    }).exec();
    res.status(200).json({
      status: 'success',
      reservations
    });
  } catch (e){
    console.log(e);
    next(new AppError('Unable to fetch reservations at the moment', 400));
  }
};

// To get reservation based on checkout session id
exports.getReservation = async (req, res, next) => {

  console.log(req.params," PArams");

  // console.log("get reservation by sessiion");


  // const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);

  try {
    const reservation = await Reservation.findById(
      req.params.sessionId
    );
    res.status(200).json({
      reservation
    });
  } catch {
    next(new AppError('Unable to update the reservation at the moment', 400));
  }
};
