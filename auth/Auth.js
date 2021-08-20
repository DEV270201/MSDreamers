const jwt = require("jsonwebtoken");
const { AuthorizationError } = require("../utils/AppErrors");
const {promisify} = require('util');
const User = require('../models/UserModel');

const Authenticator = async (req,_res,next)=>{
    try{
      
        let token = req.header('authorization').split(" ")[0];

        if(!token){
            return next(new AuthorizationError("User not logged in!"));
        }

        const decoder = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        
        req.user = await User.findById(decoder.id);
       
        next();

    }catch(err){
        console.log("Error from the authenticator middleware : " , err);
        return next(err);
    }

}

module.exports = Authenticator;
