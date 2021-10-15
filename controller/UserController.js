const User = require('../models/UserModel');
const {ClientError} = require("../utils/AppErrors");
const bcrypt = require('bcryptjs');
const sendEmail = require("../utils/Email");
const crypto = require("crypto");
const TokenGenerator = require('../utils/TokenGenerator');
const ejs = require('ejs')


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

exports.ForgetPassword = async (email) => {
    try {
        
        const user = await User.findOne({email: email});
        if (!user) {
            throw new ClientError('Email id not registered!');
        }

        const {hashToken,token} = TokenGenerator();
        // user.passwordResetToken = hashToken,
        // user.passwordResetExpire = Date.now() + 120 * 1000;
        await User.findByIdAndUpdate(user.id , {
            passwordResetToken: hashToken,
            passwordResetExpire: Date.now() + 120 * 1000
        });

        try {
            const subject = `Password Reset E-mail`;
            let uri = `http://localhost:4000/users/changePassword/${token}`;
            let data = await ejs.renderFile("./templates/ResetPasswordMail.ejs", {uri:uri} , {async : true});

            await sendEmail(email , subject, data);
            return;
            
        } catch (err) {
            throw err;
        }
    } catch (err) {
        console.log("errrrrrrrrr : " , err);
        throw err;
    }
}

exports.ChangePassword = async (token,password)=>{
    try{

        let hashedToken = crypto.createHash("SHA256").update(token).digest("hex");
        let tokenObj = await User.find({ passwordResetToken  : hashedToken, passwordResetExpire : {$gt : Date.now()}});
        
        if(!tokenObj){
            throw new ClientError("Your token has expired!!");
        }

        const salt = await bcrypt.genSalt(10);
        const newPass = await bcrypt.hash(password,salt);

        await User.findOneAndUpdate(tokenObj.id, {password : newPass});
        return;

    }catch(err){
        console.log("errrrrrrrrr : " , err);
        throw err;
    }
}