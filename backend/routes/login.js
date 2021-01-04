import { ACCESS_TOKEN_SECRET } from "../public-testing-env.js";
import bcrypt from "bcryptjs";
import express from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import models from "models";

const { User } = models;
const loginRouter = express.Router();
// Checks for correct password -- CHANGE TO POST
loginRouter.route('/auth').post(async (req, res, next) => {
  // Validation schema for post request
  const checkLogin = Joi.object().keys({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required()
  });
 
  try {
    const {
      body 
    } = req;  
    console.log("POST-LOGIN- - - - ");
    // Validating incoming data and destructure
    const { username, password: inputPass } = await checkLogin.validate(body).value;

    // Finding user record, only select and destructure necessary attributes
    const { _id,  name, password } = await User.findOne({ username }).select('_id name password');

    // Comparing input password by hashing it, and comparing with the db hash, then check for mismatch
    const match = await bcrypt.compareSync(inputPass, password);
    if (!match) return res.status(401).json({ message: "Please enter valid credentials" });
  
    // Create bundle for token
    const user = { username, _id };
    console.log("Correct Login:"+ JSON.stringify(user));

    const token = jwt.sign(user, ACCESS_TOKEN_SECRET);

    console.log("TOKEN: "+ token);
   
    res.json({
      userId: _id,
      message: "You have successfully logged in",
      name,
      token});
    next();

  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Please enter valid credentials" });
  }
});

export default loginRouter