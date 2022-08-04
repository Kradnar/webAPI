const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/model");

exports.hashPass = async (req, res, next) => {
  try {
    if (!req.body.password) {
      console.log("Skipping Hash...")
      next()
    }
    else {
    console.log("hashing Password...")
    //take a password out of the body, hash that password with bcrypt, and then put it back in the body
    const pass = req.body.password;  //grab value
    console.log(pass)
    const hashedPass = await bcrypt.hash(pass, 8); //hash value
    console.log(hashedPass)
    req.body.password = hashedPass; //re-store value
    // 3 above lines (excluding console.logs) in ONE line
    // req.body.password = await bcrypt.hash(req.body.password, 8); 
    next()
    }// moves onto next parameter
  } 
  catch (error) {
    console.log(error);
    res.send({ err: error });
  }
};

exports.comparePass = async (req, res, next) => {
  try {
    if (!req.body.password) {
      console.log("Skipping Compare...")
      next()
    }
    else {
    console.log("Comparing entered Password with stored Password...")
    //? Version 1
    // const user = await User.findOne({ username: req.body.username });
    // const matched = await bcrypt.compare(req.body.password, user.password);
    // if (matched) {
    //   next();
    // } 
    // else {
    //   throw new Error()
    // }
    //? Version 2
    req.user = await User.findOne({ username: req.body.username})
    console.log(req.body.password);
    console.log(req.user.password);
    console.log(await bcrypt.compare(req.body.password, req.user.password))
    if (req.user && (await bcrypt.compare(req.body.password, req.user.password))) {
    next()
    }
    else {
      throw new Error({ msg: "Incorrect Credentials"})
    }
    //find user in database, compare password from body with password from db with bcrypt
    //if successful pass user to controller through req, if unsuccessful send error
    }
  }
  catch (error) {
    console.log(error);
    res.send({ err: error })
  }
};

exports.tokenCheck = async (req, res, next) => {
  try {
    console.log("Checking Token...");
    const token = req.header("Authorization");
    const decodedToken = await jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken._id);
    req.user = user;
    next();
    //get the token from req, unlock the token, find the user with the id in the token, send the user to a controller
  } 
  catch (error) {
    console.log(error);
    res.status(418).send({ err: error })
  }
}