const UserScore = require('../models/UserScoreModel');
const Test = require("../models/TestModel");

exports.testResults = async (req) => {
    try {
        
        const user = req.user;
        const {score, subject, test, testNumber } = req.body;
        await UserScore.create({
            user: user.id,
            score,
            subject,
            test,
            testNumber
        })
        return;
    } catch (err) {
        console.log("Error: ", err);
        throw err;
    }
}

exports.fetchAllTests = async ()=>{
    try{
        let tests = await Test.find({},{questAns : 0});
        return tests;
    }catch(err){
        console.log("Error: ", err);
        throw err;
    }
}

exports.fetchSingleTest = async (test_id) => {
    try {
        const test = await Test.findById(test_id);
        return test;
    } catch (err) {
        console.log("Error: ", err);
        throw err;   
    }
}