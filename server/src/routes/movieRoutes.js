const express = require('express');
const {
  addMovie,
  getMovies,
  updateMovie,
  getMovie,
  deleteMovie,
  getAllMovies
} = require('../controllers/movieController');

const router = express.Router();

router
  .get('/', getMovies)
  .post('/', addMovie)
  .patch('/:movieId', updateMovie)
  .get('/:movieId', getMovie)
  .delete('/:movieId',deleteMovie)
  .put('/getAllMovies',getAllMovies);
module.exports = router;
