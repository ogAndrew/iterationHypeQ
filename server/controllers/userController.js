const db = require('../models/mediaModels');
const bcrypt = require('bcrypt');

const userController = {};
//We ended up not using the salt laid out below because bcrypt generates it for us, should we drop tables and create new tables without the "salt" value?
const createUserTableQuery = 'CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username TEXT NOT NULL UNIQUE, hashed_password TEXT NOT NULL, salt TEXT NOT NULL);'
const getUserQuery = `SELECT * FROM users WHERE username = $1`
const createNewUserQuery = `INSERT INTO users (username, hashed_password) VALUES ($1, $2) RETURNING username`;

const handleLoginFailure = failureString => {
  res.locals.isLoggedIn = false;
  return res.status(400).json({username: '', isLoggedIn: res.locals.isLoggedIn, errorMessage: failureString})
}

userController.loginUser = async (req, res, next) => {
  //Destructure username and password from the request body
  const { username, password } = req.body;

  //check if both username and password were input
  if(!username || !password) {
    handleLoginFailure('Fill out both a username AND password');
  }
  const values = [username];
  //Query db for matching username
  const foundUser = await db.query(getUserQuery, values);
  console.log(foundUser)
  //if user isn't found, throw error 
  if (!foundUser.rows[0].length){
    handleLoginFailure('That user was not found, please try again')
  }

  //find the hashed password for the found user (store the name) and compareSync the inputted password with the hash password 
  const hashPassword = foundUser.rows[0].password;
  const userName = foundUser.rows[0].username;
  //compare inputted password with stored, hashed password
  const compare = bcrypt.compareSync(password, hashPassword);
  //throw error if password doesn't match
  if(!compare) {
    handleLoginFailure('Your username or password was entered incorrectly')
  }

  //if password matches, store user object and send in response
  res.locals.isLoggedIn = true;
  res.locals.userObject = foundUser.rows[0];

  return next();
}

userController.signupUser = async (req, res, next) => {
  const {username, password} = req.body;

  if (!username || !password){
    handleLoginFailure('One of the fields is invalid, please try again');
  }

  //hash and salt password
  const salt = bcrypt.genSalt(12)
  const hashPassword = bcrypt.hashSync(password, salt);
  
  const values = [username, hashPassword];
  const foundUser = await db.query(getUserQuery, values);
  //if user already exists throw error
  if(foundUser.rows.length){
    handleLoginFailure('That username is taken, please try a new one');
  }

  const userCreated = await db.query(createNewUserQuery, values);

  res.locals.isLoggedIn = true;
  res.locals.newUserObject = userCreated.rows[0]

  return next();
}

module.exports = userController;