const express = require('express');
const {
  addShowTiming,
  getAllShowTimings,
  getReservedSeats,
  getShowTimings,
  updateShowTiming,
  deleteShowTiming
} = require('../controllers/showTimingController');

const router = express.Router();

router
  .get('/', getAllShowTimings)
  .get('/reserved-seats', getReservedSeats)
  .get('/:movieId', getShowTimings)
  .post('/', addShowTiming)
  .patch('/:showTimingId', updateShowTiming)
  .delete('/:showTimingId',deleteShowTiming) 
  ;

module.exports = router;



