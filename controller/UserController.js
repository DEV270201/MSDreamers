const User = require('../models/UserModel');
const {ClientError} = require("../utils/AppErrors");
const bcrypt = require('bcryptjs');
const sendEmail = require("../utils/Email");
const crypto = require("crypto");
const TokenGenerator = require('../utils/TokenGenerator');
const ejs = require('ejs');


exports.ChangePassword = async (user, password, newPassword)=>{
    try{
        if(await bcrypt.compare(password, user.password)) {
            const salt = await bcrypt.genSalt(10);
            const newPass = await bcrypt.hash(newPassword,salt);
            await User.findOneAndUpdate(user.id, {password : newPass});
            return;
        } else{
            throw new ClientError('Password does not match!');
        }
    }catch(err){
        console.log("errrrrrrrrrrrr : " , err);
        throw err;
    }
}

exports.ForgetPassword = async (email) => {
    try {
        console.log("backenddddddddddd");
        const user = await User.findOne({email: email});

        console.log("user : ", user);

        if(!user || user.googleLogin){
            console.log("hello here...");
            throw new ClientError('You do not have an MsDreamers account connected to your email. If you have an account, please login with google. If you do not have an MsDreamers account, please sign up.');
        }

        const {hashToken,token} = TokenGenerator();
        // user.passwordResetToken = hashToken,
        // user.passwordResetExpire = Date.now() + 120 * 1000;
        await User.findByIdAndUpdate(user.id , {
            passwordResetToken: hashToken,
            passwordResetExpire: Date.now() + 120 * 1000
        });
        console.log("i'm coming hereeeee")
        try {
            console.log("try for email");
            const subject = `Password Reset E-mail`;
            let uri = `http://localhost:3000/resetPassword/${token}`;
            let data = await ejs.renderFile("./templates/ResetPasswordMail.ejs", {uri:uri} , {async : true});
            console.log("render ejs");
            await sendEmail(email , subject, data);
            console.log("....................................................");
            return;
            
        } catch (err) {
            throw err;
        }
    } catch (err) {
        console.log("errrrrrrrrr : " , err);
        throw err;
    }
}

exports.ResetPassword = async (token,password)=>{
    try{
        let hashedToken = crypto.createHash("SHA256").update(token).digest("hex");
        let tokenObj = await User.findOne({ passwordResetToken  : hashedToken, passwordResetExpire : {$gt : Date.now()}});

        console.log("Token Obj : ",tokenObj);
        
        if(!tokenObj){
            throw new ClientError("Your token has expired!!");
        }

        const salt = await bcrypt.genSalt(10);
        const newPass = await bcrypt.hash(password,salt);

        await User.findOneAndUpdate(tokenObj.id, {password : newPass,passwordResetExpire:null,passwordResetToken:null});
        return;

    }catch(err){
        console.log("errrrrrrrrr : " , err);
        throw err;
    }
}

exports.EditProfile = async(req, profileObj) => {
    try {
        await User.findOneAndUpdate(req.user.id,profileObj);
        return;
    } catch (err) {
        console.log("errrrrrrrrr : " , err);
        throw err;
    }
}

exports.GetProfile = async(req)=>{
    try{
      let resp = await User.findById(req.user.id,{name:1,email:1,profile_pic:1,phoneNumber:1,exams:1});
      console.log("backend resp : ",resp);
      return resp;
    }catch(err){
        console.log("Errrr : ",err);
        throw err;
    }
}