const express = require('express');
const {RegisterUser} = require('../controller/UserController');
const {UserRegistrationJoi} = require("../joi/UserJoi");
const {LoginUser} = require('../controller/UserController');
const router = express.Router()

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
        await LoginUser(req, res, next);

        res.status(200).json({
            status : "success",
            message : "User logged in successfully!"
        });
        
    } catch(err){
        console.log("Error : " , err);
        return next(err);
    }
});

module.exports = router;