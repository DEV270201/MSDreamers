const express = require('express');
const router = express.Router();
const {testResults} = require('../controller/TestController');
const auth = require("../auth/Auth");
const Test = require("../models/TestModel");
const TestIDRouter = require("./TestIDRouter");

router.use("/givetest" , TestIDRouter);  

//for uploading the questions
router.post("/upload" , async (req,res,next)=>{
    try {
      await Test.create(req.body);
      res.status(201).json({
          status : "success"
      });
        
    } catch (err) {
        console.log('errrrrrr : ',  err);
        return next(err);
    }
});

//for uploading the test and returning the score
// TODO
router.post("/testresults", auth, async (req, res, next) => {
    try {
        await testResults(req);
        res.status(201).json({
            status: "success",
        })
    } catch (err) {
        console.log('errrrrrr : ',  err);
        return next(err);
    }
})

module.exports = router;