import bcrypt from "bcryptjs";
import express from "express";
import Joi from "joi";
import models from "models";

const { User } = models;
const saltRounds = 10
const signUpRouter = express.Router();
// Checks if email or username already exists so we can prevent account duplication
signUpRouter.route('/auth').post(async (req, res, next) => {
  // Validation schema for sign-up
  const checkSignUp = Joi.object().keys({
    name:Joi.string().min(2).trim(),
    username: Joi.string().required().min(3).trim(),
    email: Joi.string().required().trim(), // .email() -- Make sure the input is an email
    password: Joi.string().required().min(3).trim(), //.regex(/^[a-zA-Z0-9]{3,30}$/) -- For password security
  });
 
  try {
    const {
      body
    } = req;
    // Validate data sent then destructure values
    let validSignUp = await checkSignUp.validate(body).value;
    let { username, email, password } = validSignUp;

    // Check for duplicate account and return possible duplicated values
    const userExists = await User.findOne({$or: [{ username }, { email }]}).select("username email");
    if (userExists){
      console.log("Account Exists:\t" + userExists);
      return res.status(403).json({ message: "This account already exists" });
    }

    // Hash the password and store in creation object
    console.log("Account Creation Possible ...");
    validSignUp.password = bcrypt.hashSync(password, saltRounds);

    // Saving the new user to the database with the encrypted password
    const userCreated = await User.create(validSignUp);
    // User creation status.
    if (userCreated){   
      console.log(userCreated);
      res.json({message: "Your account has been created successfully"});
    }
    next();
  } catch (error) {
    console.error(error);
  }
});

export default signUpRouter;