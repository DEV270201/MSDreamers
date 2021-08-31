const express = require('express');
const {UserRegistrationJoi , UserLoginJoi , UserPasswordChangeJoi , UserPasswordResetJoi} = require("../joi/UserJoi");
const {RegisterUser, LoginUser , GoogleSignIn , VerifyEmailAccount} = require('../controller/AuthController');
const { ResetPassword, ForgetPassword, ChangePassword} = require('../controller/UserController');
const router = express.Router();
const auth = require("../auth/Auth");

// @route   POST /register
// @desc    Register user
// @access  Public

router.post('/register', async (req, res, next) => {
    try {
        console.log("in the register route");
        const userObject = await UserRegistrationJoi({...req.body});
        await RegisterUser(res, userObject);

        res.status(201).json({
            success: "true",
            message: "User registered successfully!",
        });

    } catch (err) {
        console.log(err);
        return next(err);
    }
});

router.post("/login" , async (req,res,next)=>{
    try{
        const login = await UserLoginJoi(req.body);
        await LoginUser(login, res, next);

        res.status(200).json({
            status : "success",
            message : "User logged in successfully!"
        });
        
    } catch(err){
        console.log("Error : " , err);
        return next(err);
    }
});

router.post("/googleSignIn" , async (req,res,next)=>{
    try{
    console.log("request recieved");

     let token = {...req.body};
     const userDetails = await GoogleSignIn(token);

    if (userDetails){
        res.status(200).json({
            status: "success",
            details: userDetails
        });
    } else {
        res.status(200).json({
            status: "success",
            message : "user successfully signed in!"
        });
    }

    }catch(err){
        console.log(err);
        return next(err);
    }
});

router.get("/verifyAccount/:token", async (req, res, next) => {
try{
    
    let token = String(req.params.token);
    await VerifyEmailAccount(token);
    res.status(200).json({
        status : "success",
        message : "user email verified successfully!",
    });

}catch(err){
    console.log("error : " , err);
    return next(err);
}
});


router.post('/resetPassword', auth, async (req, res, next) => {
    try{

        const {password,newPassword} = await UserPasswordResetJoi({...req.body});
        await ResetPassword(req.user,password,newPassword);
        res.status(200).json({
            status : "success",
            message : "Password reset successful!",
        });

    }catch(err){
        console.log("errr : " , err);
        return next(err);
    }
});

router.post('/forgotPassword', async (req, res, next) => {
    try {

        const {email} = req.body;
        await ForgetPassword(email,next);

        console.log("THEEEEEEE CODE>>>>>>>>>>");
        
        res.status(200).json({
            status : "success",
            message : "Password reset link has been sent to your email!",
        });

    } catch (err) {
        console.log("errr : " , err);
        return next(err);
    }
});


router.post("/changePassword/:token" , async (req,res,next)=>{
    try{
        let token = String(req.params.token);
        let {password} = await UserPasswordChangeJoi({...req.body});
        await ChangePassword(token,password);

        res.status(200).json({
            status : "success",
            message : "user password changed successfully!"
        });
        
    }catch(err){
        console.log("errr : " , err);
        return next(err);
    } 
});

module.exports = router;