const User = require('../models/UserModel');
const {ClientError} = require("../utils/AppErrors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const {OAuth2Client} = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID , process.env.CLIENT_SECRET);

exports.RegisterUser = async (_res, userDetails) => {
    const { name, email, phoneNumber, password, securityWord, exams } = userDetails;
    try {
        const user = new User({
            name, 
            email, 
            phoneNumber, 
            password, 
            securityWord, 
            exams
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        user.securityWord = await bcrypt.hash(securityWord,salt);

        await user.save();

        return;

    } catch (err) {
        console.log("error : " , err);
        throw err;
    }
}


exports.LoginUser = async (login, res, next) => {
    try{
        
        const { email, password, securityWord } = login;
        const user = await User.findOne({ email: email });
    
        if(!user) {
            return next(new ClientError("Invalid credentials!"));
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        const isSecurityWordMatch = await bcrypt.compare(securityWord, user.securityWord);
        
        if (!isPasswordMatch){
            return next(new ClientError("Invalid credentials!"));
        }

        if (!isSecurityWordMatch){
            return next(new ClientError("Invalid credentials!"));
        }
        
        const payload  = {
                id: user.id
        }

        const token = await promisify(jwt.sign)(payload, process.env.JWT_SECRET);

        //it will set the cookie in the browser
        res.cookie("jwt" , token , {
            httpOnly : true,
            secure : false
        });
        
        return;

    } catch (err) {
        console.log("Error : " , err);        
        throw err;
    }
}

exports.GoogleSignIn = async (body)=>{
   try{
    console.log("Token : " , body.token);
      const response = await client.verifyIdToken({idToken : body.token , audience : process.env.CLIENT_ID});
      console.log("user response : " , response);

   } catch(err){
       console.log("in the user controller : " , err);
       throw err;
   }
}