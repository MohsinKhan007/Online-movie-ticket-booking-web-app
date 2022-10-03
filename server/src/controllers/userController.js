const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AppError = require('../utils/appError');
require('dotenv').config();

// To generate token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

// Generate and send token
const sendToken = (user, res, statusCode) => {
  const token = generateToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: false,
    httpOnly: true
  };

  // Set secure = true in production for sending cookies only over https
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  // To remove password from response
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

// To signup a user/Register user
exports.signUpUser = async (req, res, next) => {
  try {
    console.log("Sign up function");

    console.log(req.body);

    const newUser = await User.create(req.body);

    console.log(newUser," new user ");

    sendToken(newUser, res, 201);
  } catch(e) {

    console.log(e);



    next(new AppError('Unable to Signup at the moment', 400));
  }
};

// Signin user Log-In user
exports.signInUser = async (req, res, next) => {
  const { emailId, password } = req.body;

  try {
    // Check if email and password is supplied
    if (!emailId || !password) {
      return next(new AppError('Please provide email and password', 401));
    }

    const user = await User.findOne({ emailId }).select('+password');

    console.log("USer is  ",user);


    // Check if user exists and if password is correct
    if (!user || !(await user.verifyPassword(password, user.password))) {
      return res.status(200).json({
        status: 'unauthorized'
      });
    }

    // If above validations are passed, send token
    return sendToken(user, res, 200);
  } catch(e) {
    console.log("error :  ",e);
    return next(new AppError('Unable to Signin at the moment', 400));
  }
};

// Get user based on Token when App refresh
exports.fetchUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(200).json({
      status: 'unauthorized'
    });
  } else {
    // Token Verification
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await User.findById(decoded.id);

    console.log("loggedin user", currentUser);

    if (currentUser) {
      res.status(200).json({
        status: 'success',
        data: {
          user: currentUser
        }
      });
    } else {
      next(new AppError('User does not exist! Unauthorized access', 401));
    }
  }
};

// Logout user and clear JWT cookie
exports.signoutUser = (req, res) => {
  res.clearCookie('jwt');
  return res.status(200).json({ status: 'success' });
};

exports.getUserById=async(req,res)=>{

  const token = req.cookies.jwt;
  if (!token) {
    res.status(200).json({
      status: 'unauthorized'
    });
  }
    else{
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    
    const user = await User.findById({ _id: decoded.id });
    console.log("user ",user);
    
    res.status(200).json({
      user
    })



    }
  // const user = await User.findOne({ emailId }).select('+password');


}