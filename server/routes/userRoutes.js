const express = require('express');
const userController = require('../controllers/userController.js');

const router = express.Router();

//login post request
router.post('/login', userController.loginUser, (req, res) => {
  return res 
      .set('Content-Type', 'application/json')
      .status(200).json({username: res.locals.username, isLoggedIn: res.locals.isLoggedIn})
});

//Signup Post request
router.post('/signup', userController.signupUser, (req, res) => {
  return res
      .set('Content-Type', 'application/json')
      .status(200).json({username: res.locals.username, isLoggedIn: res.locals.isLoggedIn})
});

//Logout Post request
router.post('/logout', (req, res) => {
  return res
      .set('Content-Type', 'application/json')
      .status(200).send('Hello - logout')
});

module.exports = router;