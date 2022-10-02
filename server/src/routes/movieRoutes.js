const express = require('express');
const {
  addMovie,
  getMovies,
  updateMovie,
  getMovie,
  deleteMovie
} = require('../controllers/movieController');

const router = express.Router();

router
  .get('/', getMovies)
  .post('/', addMovie)
  .patch('/:movieId', updateMovie)
  .get('/:movieId', getMovie)
  .delete('/:movieId',deleteMovie);
module.exports = router;
