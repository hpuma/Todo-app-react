const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require("bcryptjs");
const saltRounds = 10


// Checks if email or username already exists so we can prevent account duplication
router.route('/auth').post(async (req, res) => {
    // When some of the sign up fields are missing
    if (!req.body.username || !req.body.password || !req.body.email || !req.body.name) {
        return res.status(401).json({message: 'Please fill out all fields'});
    }
    // Renaming req information
    userInfo = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    }
    // Checking for an account that already exists with the current credentials submitted.
    const result = await User.findOne({$or: [{username: userInfo.username}, {email: userInfo.email}]}).catch(err=>console.log(err));
        if(result === null){
            // Handle possible successful account creation
            console.log("Account Creation Possible");
            const passHash = bcrypt.hashSync(userInfo.password, saltRounds);

            if (passHash){
                userInfo.password = passHash;
                // Saving the new user to the database
                const newUser = new User(userInfo);
                const userCreated = await newUser.save();
                // User creation status.
                if (userCreated){   
                    console.log(userCreated);
                    res.json({message: "Your account has been created successfully"});
                }else{
                    res.status(403).json({message: "There was an error creating your account"});
                }
                return;
            } 
        } else {// Handle unsuccessful account creation because account already exists
            console.log("ACCOUNT EXISTS:" + result);
            res.status(403).json({message: "This account already exists"});
            return;
        }
});

module.exports = router