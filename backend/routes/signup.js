import express from "express";
import models from "models";
import bcrypt from "bcryptjs";

const { User } = models;
const saltRounds = 10
const signUpRouter = express.Router();
// Checks if email or username already exists so we can prevent account duplication
signUpRouter.route('/auth').post(async (req, res, next) => {
    // When some of the sign up fields are missing
    if (!req.body.username || !req.body.password || !req.body.email || !req.body.name) {
        return res.status(401).json({message: 'Please fill out all fields'});
    }
    // Renaming req information
    const userInfo = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }

    try {
        await User.findOne({$or: [{username: userInfo.username}, {email: userInfo.email}]}).catch(err=>console.log(err));
        // Handle possible successful account creation
        console.log("Account Creation Possible");
        const passHash = bcrypt.hashSync(userInfo.password, saltRounds);

        userInfo.password = passHash;
        // Saving the new user to the database
        const newUser = new User(userInfo);
        const userCreated = await newUser.save();
        // User creation status.
        if (userCreated){   
            console.log(userCreated);
            res.json({message: "Your account has been created successfully"});
        }
        next();
    }
    catch (error) {
        console.error(error);
        res.status(403).json(error.message);
    }
});

export default signUpRouter;