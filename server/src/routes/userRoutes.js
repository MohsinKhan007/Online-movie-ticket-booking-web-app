const express = require('express');
const {
  signUpUser,
  signInUser,
  fetchUser,
  signoutUser,
  getUserById
} = require('../controllers/userController');

const router = express.Router();

router
  .post('/signup', signUpUser)
  .post('/signin', signInUser)
  .get('/signin', fetchUser)
  .get('/signout', signoutUser)
  .get('/profile',getUserById);



module.exports = router;
