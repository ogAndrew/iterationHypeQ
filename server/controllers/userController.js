const db = require('../models/mediaModels');
const bcrypt = require('bcrypt');

const userController = {};
//We ended up not using the salt laid out below because bcrypt generates it for us, should we drop tables and create new tables without the "salt" value?
const createUserTableQuery = 'CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username TEXT NOT NULL UNIQUE, hashed_password TEXT NOT NULL, salt TEXT NOT NULL);'
const getUserQuery = `SELECT * FROM users WHERE username = $1`
const createNewUserQuery = `INSERT INTO users (username, hashed_password, salt) VALUES ($1, $2, $3) RETURNING username`;

userController.loginUser = async (req, res, next) => {
  //Destructure username and password from the request body
  const { username, password } = req.body;

  //check if both username and password were input
  if(!username || !password) {
    res.locals.isLoggedIn = false;
    res.locals.errorMessage = 'Both fields must be filled!'
    return res.status(400).json({username: '', isLoggedIn: res.locals.isLoggedIn, errorMessage: res.locals.errorMessage})
  }
  //set inputted username to an array that the query can read
  const values = [username];
  //Query db for matching username
  const foundUser = await db.query(getUserQuery, values);

  //if user isn't found, throw error 
  if (!foundUser.rows.length){
    res.locals.isLoggedIn = false;
    res.locals.errorMessage = 'User not found!'
    return res.status(400).json({username: '', isLoggedIn: res.locals.isLoggedIn, errorMessage: res.locals.errorMessage})
  }

  //find the hashed password for the found user and compareSync the inputted password with the hash password 
  const hashPassword = foundUser.rows[0].hashed_password;
  const compare = bcrypt.compareSync(password, hashPassword);

  //throw error if password doesn't match
  if(!compare) {
    res.locals.isLoggedIn = false;
    res.locals.errorMessage = 'Password incorrect!'
    return res.status(400).json({username: '', isLoggedIn: res.locals.isLoggedIn, errorMessage: res.locals.errorMessage})
  }

  //if password matches, store user object and send in response
  res.locals.isLoggedIn = true;
  res.locals.userObject = foundUser.rows[0];

  return next();
}

userController.signupUser = async (req, res, next) => {
  const {username, password} = req.body;

  if (!username || !password){
    res.locals.isLoggedIn = false;
    res.locals.errorMessage = 'Both fields must be filled!'
    return res.status(400).json({username: '', isLoggedIn: res.locals.isLoggedIn, errorMessage: res.locals.errorMessage})
  }

  //hash and salt password
  const salt = bcrypt.genSalt(12)
  const hashPassword = bcrypt.hashSync(password, 10);

  //set username to an array that the query can read
  const userSearch = [username];
  const foundUser = await db.query(getUserQuery, userSearch);

  //if user already exists throw error
  if(foundUser.rows.length){
    res.locals.isLoggedIn = false;
    res.locals.errorMessage = 'Username already exists, please try again!'
    return res.status(400).json({username: '', isLoggedIn: res.locals.isLoggedIn, errorMessage: res.locals.errorMessage})
  }
  //set userinformation to an array that query can read, then execute query
  const values = [username, hashPassword, salt];
  const userCreated = await db.query(createNewUserQuery, values);
  //set login state to true, store created user in response
  res.locals.isLoggedIn = true;
  res.locals.newUserObject = userCreated.rows[0]

  return next();
}

module.exports = userController;