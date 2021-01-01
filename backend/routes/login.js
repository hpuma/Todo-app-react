import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "models";
 
const router = express.Router();
// Checks for correct password -- CHANGE TO POST
router.route('/auth').post(async (req, res) => {
    console.log("POST-LOGIN- - - - ");
    if (!req.body.username || !req.body.password) {
        res.status(401).json({message: "Please fill out all fields"});
        return;
    }
    // Renaming request information
    inputUser = req.body.username;
    inputPass = req.body.password;
    // Finding the account in the database
    const result = await User.findOne({username: inputUser}).catch(err=>console.log(err));
    if(!result){
        res.status(401).json({message: "Please enter valid credentials"});
        return;
    }
    // Comparing input password by hashing it, and comparing with the db hash.
    const match = await bcrypt.compareSync(inputPass, result.password);
    if(match === true) {
        const user = {username: inputUser, _id: result._id};
        console.log("Correct Login:"+ JSON.stringify(user));

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        console.log("TOKEN: "+ accessToken);
        res.json({
            message: "You have successfully logged in",
            name: result.name,
            token: accessToken});
        return;
    }else {res.status(401).json({message: "Please enter valid credentials"});}
        
});

module.exports = router