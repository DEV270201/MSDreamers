const express = require('express');
const RegisterUser = require('../controller/RegisterUser');
const {UserRegistrationJoi} = require("../joi/UserJoi");

const router = express.Router()

// @route   POST /register
// @desc    Register user
// @access  Public

router.post('/', async (req, res) => {
    try {
        console.log("in the register route");
        const userObject = await UserRegistrationJoi({...req.body});
        const result = await RegisterUser(res, userObject);
        if (result) {
            res.status(201).json({
                success: "true",
                message: "User registered successfully!",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error')
    }
})

module.exports = router;