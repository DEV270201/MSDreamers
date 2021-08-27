const User = require('../models/UserModel');
const EmailVerify = require('../models/EmailVerifyModel');
const {ClientError, AuthorizationError} = require("../utils/AppErrors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const {OAuth2Client} = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID , process.env.CLIENT_SECRET);
const sendEmail = require("../utils/Email");

const signJWT = async (user_id)=>{
    return await promisify(jwt.sign)(user_id,process.env.JWT_SECRET);
}

exports.RegisterUser = async (_res, userDetails) => {
    const { name, email, phoneNumber, password, securityWord, exams } = userDetails;

    let active = false;
    let googleLogin = false;

    if (!password){
       active = true;
       googleLogin = true
    }
    
    try {
        const user = new User({
            name, 
            email, 
            phoneNumber, 
            password, 
            securityWord, 
            exams,
            active,
            googleLogin
        });

        const salt = await bcrypt.genSalt(10);
        user.securityWord = await bcrypt.hash(securityWord,salt);

        if(password){
            user.password = await bcrypt.hash(password,salt);
        }

        await user.save();
        if(password){
            try {
                const verifyEmail = new EmailVerify({
                    user : user.id,
                });
                
                let token = verifyEmail.generateRandomToken();
                await verifyEmail.save();
                await sendEmail(token , email);  
                return;
            } catch (err) {
    
                await User.findByIdAndDelete(user.id);
                throw err;
            }
        }

    } catch (err) {
        console.log("error : " , err);
        throw err;
    }
}


exports.LoginUser = async (login, res, next) => {
    try{
        
        const { email, password, securityWord } = login;
        const user = await User.findOne({ email: email });
        if (!user.active){
            return next(new AuthorizationError("Email id not verified!"))
        }
    
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

        const token = await signJWT(payload.id);

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
      //it will print the user details 
    //   console.log("user payload : " , response.getPayload());
      let payload = response.getPayload();

      if(payload.email_verified){
          if(payload.hd === "somaiya.edu"){
            const user = await User.findOne({email: payload.email});
            if(user){
                if (!user.password){
                    const token = await signJWT(user.id);
                    res.cookie("jwt", token, {
                        httpOnly : true,
                        secure : false
                    });
                    return;
                } else {
                    throw new AuthorizationError("Google account not linked for this email id!")
                }
            } else {
                const userDetails = {
                    firstName: payload.given_name,
                    lastName: payload.family_name,
                    email: payload.email
                }
                return userDetails;
            }
          }else{
           throw new AuthorizationError("please use somaiya mail id to login!");
          }
      }else{
          throw new AuthorizationError("user not verified!");
      }

   } catch(err){
       console.log("in the user controller : " , err);
       throw err;
   }
}