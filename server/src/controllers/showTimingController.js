const mongoose = require('mongoose');

const ShowTiming = require('../models/showTiming');
const { createCheckoutSession } = require('./checkoutController');
const AppError = require('../utils/appError');

const { ObjectId } = mongoose.Types;

// To add a showTiming
exports.addShowTiming = async (req, res, next) => {
  req.body.date = new Date(req.body.date);


  

  try {
    const showTiming = new ShowTiming(req.body);
    await showTiming.save();
    res.status(201).json({
      status: 'success'
    });
  } catch {
    next(new AppError('Unable to add showTiming at the moment', 400));
  }
};

// To get all showTimings
exports.getAllShowTimings = async (req, res, next) => {
  try {
    const showTimings = await ShowTiming.find({});
    res.status(200).json({
      status: 'success',
      showTimings
    });
  } catch {
    next(new AppError('Unable to fetch showTimings at the moment', 400));
  }
};

// To get all reserved seats
exports.getReservedSeats = async (req, res, next) => {
  const { startAt, screenId, date } = req.query;
  try {
    const reservedSeats = await ShowTiming.find(
      {
        startAt: { $eq: startAt },
        screenId: { $eq: screenId },
        date: new Date(date)
      },
      { reservedSeats: 1 }
    ).exec();
    res.status(200).json({
      status: 'success',
      reservedSeats
    });
  } catch {
    next(new AppError('Unable to fetch reservations at the moment', 400));
  }
};


exports.deleteShowTiming=async(req,res,next)=>{
  console.log(req.params.showTimingId," Body check");
try{
  const ShowTimingDelete=await ShowTiming.deleteOne({_id:req.params.showTimingId})
  console.log(req.body," Body check");
  res.status(200).json({
    status:"sucess"
  })

}

catch(e){
  console.log(e);
  res.status(501).json({
    error:e,
    status:"Internal server error"
  })
}







}


// To get showtimings and screens based on movie id
exports.getShowTimings = async (req, res, next) => {
  const { selectedDate } = req.query;
  const { movieId } = req.params;

  console.log("selected Date: ",selectedDate);

  console.log("movie ID: ",movieId);





  try {
    const showTimings = await ShowTiming.aggregate([
      {
        $match: {
          movieId: ObjectId(`${movieId}`),
          date: { $eq: new Date(selectedDate) }
        }
      },
      {
        $lookup: {
          from: 'screens',
          localField: 'screenId',
          foreignField: '_id',
          as: 'screen_details'
        }
      },
      {
        $unset: ['screen_details._id']
      }
    ]);

    console.log(showTimings);


    res.status(200).json({
      status: 'success',
      showTimings
    });
  } catch {
    next(new AppError('Unable to fetch showTimings at the moment', 400));
  }
};

// To update a showTiming
exports.updateShowTiming = async (req, res, next) => {
  try {
    await ShowTiming.updateOne(
      { _id: req.body.showTimeId },
      { $push: { reservedSeats: req.body.selectedSeats } }
    );

    console.log("update Show Timmings controller");
    // next();
    // Go to next middleware for creating stripe checkout seesion
    //stripe session for checkout later
    createCheckoutSession(req, res, next);
    // console.log("NOJSS");
  } catch(e) {
    console.log(e);
    next(new AppError('Unable to update showTiming at the moment', 400));
  }
};
