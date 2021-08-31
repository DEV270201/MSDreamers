const User = require('../models/UserModel');
const EmailVerify = require('../models/EmailVerifyModel');
const {ClientError} = require("../utils/AppErrors");
const bcrypt = require('bcryptjs');
const sendEmail = require("../utils/Email");
const crypto = require("crypto");
const TokenGenerator = require('../utils/TokenGenerator')
const PasswordReset = require('../models/PasswordResetModel');


exports.ResetPassword = async (user, password, newPassword)=>{
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

exports.ForgetPassword = async (email,next) => {

    try {
        
        const user = await User.findOne({email: email});
    
        if (!user) {
            throw new ClientError('Email id not registered!');
        }

        const {hashToken,token} = TokenGenerator();

        let passwordObj = await PasswordReset.create({
            token: hashToken,
            user: user.id,
        });

        try {

            const subject = `Password Reset E-mail`
            const content = 
            `
                <div>
                <h3>You're receiving this e-mail because you or someone else has requested a password reset for your user account.</h3>
                <p>Click <a href="http://localhost:3000/forgotPassword/${token}">here</a> to reset your password:</p>
                <br>
                <p>If you did not request a password reset you can safely ignore this email.</p>
                </div>
                `
            await sendEmail(email , subject, content);
            return;
            
        } catch (err) {
            await PasswordReset.findByIdAndDelete(passwordObj.id);
            throw err;
        }
    } catch (err) {
        console.log("errrrrrrrrr : " , err);
        // return next(err);
        throw err;
    }
}

exports.ChangePassword = async (token,password)=>{
    try{

        let hashedToken = crypto.createHash("SHA256").update(token).digest("hex");
        let tokenObj = await PasswordReset.find({token : hashedToken});
        
        if(!tokenObj){
            throw new ClientError("Your token has expired!!");
        }

        await User.findOneAndUpdate(tokenObj.user, {password});
        console.log("ffffffffffffff : " , tokenObj.id);
        await PasswordReset.findByIdAndDelete(tokenObj.id);

        return;

    }catch(err){
        console.log("errrrrrrrrr : " , err);
        throw err;
    }
}