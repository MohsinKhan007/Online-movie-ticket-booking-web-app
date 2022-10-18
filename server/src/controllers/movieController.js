// const { default: MoviesPage } = require('../../../client/src/pages/Movies');
const Movie = require('../models/movie');
const AppError = require('../utils/appError');

// To add a movie
exports.addMovie = async (req, res, next) => {
  try {

    console.log(req.body," Body");

    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json({
      status: 'success'
    });
  } catch(e) {
    console.log(e);
    res.status(500).json({
      status:'error',
      error:e
    })
    next(new AppError('Unable to create movie at the moment', 400));
  }
};

exports.getAllMovies=async (req,res,next)=>{

  try{
    console.log("All Movies")
    const movie=await Movie.find();
    
    res.status(200).json({
      movie,
      status:"Sucess"
      
    })
  }
  catch(e){
    console.log(e);
    res.status(500).json({
      status:'An error occured. Try Again later'
    })
  }

}



// To get movies
exports.getMovies = async (req, res, next) => {
  try {
    let movies;
    const { limit, type } = req.query;

    console.log(type," type ");

    // Fetch Coming Soon movies and Currently showing movies based on type
    if (type === 'comingsoon') {
      movies = await Movie.find({
        releaseDate: { $gt: new Date() }
      }).limit(parseInt(limit));
    } else if (type === 'playingnow') {
      console.log("Data is movies ");
      movies = await Movie.find({
        releaseDate: { $lte: new Date() },
        endDate: { $gte: new Date() }
      }).limit(parseInt(limit));
    }

    res.status(200).json({
      status: 'success',
      movies
    });
  } catch(e) {
    console.log("+++++  ",e);
    next(new AppError('Unable to fetch movies at the moment', 400));
  }
};

// To update a movie
exports.updateMovie = async (req, res, next) => {
  try {

    console.log(req.body," Body ");

    await Movie.updateOne({ _id: req.params.movieId }, { $set: req.body });
    res.status(200).json({
      status: 'success'
    });
  } catch {
    next(new AppError('Unable to update movie at the moment', 400));
  }
};

// To get a movie
exports.getMovie = async (req, res, next) => {
  try {
    console.log("ide aaya hai");
    const movie = await Movie.findById({ _id: req.params.movieId });
    console.log(movie);
    res.status(200).json({
      status: 'success',
      movie
    });
  } catch {
    next(new AppError('Unable to fetch movie at the moment', 400));
  }
};


exports.deleteMovie=async(req,res)=>{
  try{


    // const movie = await Movie.findById({ _id: req.params.movieId });

    const movie =await Movie.deleteOne({_id:req.params.movieId})

    res.status(200).json({
      message:"Deleted sucessfully"
    })

    // console.log(movie);

  }
  catch(e){
     console.log(e);
    next(new AppError('Unable to fetch movie at the moment', 400));
  }
}