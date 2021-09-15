const Forum = require('../models/ForumModel');
const Filter = require('bad-words');

exports.addQuestion = async (req) => {
    try {

        const user = req.user.id;
        let {question} = req.body;

        //profanity check
        var CustomFilter = new Filter();
        question = CustomFilter.clean(question);
        console.log(question);
        await Forum.create({
            user,
            question
        });
        
    } catch (err) {
        console.log("Error : " , err);
        throw err;
    }
}

exports.allQuestions = async () => {
    try {
       const questions = await Forum.find({},{answers : 0}).populate("user" ,"name").sort('-date');

       return questions;
        
    } catch (err) {
        console.log("Error : " , err);
        throw err;
    }
}

exports.getQuestionDetails = async(id) => {
    try {

        const answers = await Forum.findById(id).select('answers')
        return answers
        
    } catch (err) {
        console.log("Error : " , err);
        throw err;
    }
}