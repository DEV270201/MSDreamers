const Forum = require('../models/ForumModel');
const Filter = require('bad-words');
const {ClientError} = require("../utils/AppErrors");

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

        const answers = await Forum.findById(id).select('answers').sort('-upvotes')
        return answers
        
    } catch (err) {
        console.log("Error : " , err);
        throw err;
    }
}

// Add answer to a question
exports.addAnswer = async (req) => {
    try {
        const user = req.user;
        const id = req.params.id;
        const {answer} = req.body

        const forum = await Forum.findById(id);
        forum.answers.unshift({
            user: user.id,
            answer: answer
        })

        await forum.save()

        return

    } catch (err) {
        console.log("Error: ",err);
        throw err;
    }
}

exports.likeQuestion = async(req,id)=>{
    try{
        
        let user12 = req.user;
        let quest = await Forum.findById(id);

        //if the user exists then we will remove the user from the liked array
        if(quest.likes.find(({user})=> user.toString() === user12.id)){
            quest.likes = quest.likes.filter((val)=>{
                val.id.toString() !== user12.id
            });
        }else{
            quest.likes.unshift({user : user12.id});
        }
        await quest.save();

        return;
        
    }catch(err){
        console.log("errrrrrrrr : ", err);
        throw err;
    }
}

exports.deleteAnswer = async (req,id) => {
    try{
        let ans_id = req.params.ans_id;
        let quest = await Forum.findById(id);
        quest.answers = quest.answers.filter((obj)=>{
            return obj.id.toString() !== ans_id
        });
        await quest.save();
        return;
    }catch(err){
        console.log("errrrrrrrr : ", err);
        throw err;
    }
}

exports.deleteQuestion = async (req, quest_id) => {

    try {
        
        const user = req.user;
    
        const forum = await Forum.findById(quest_id);
        console.log(forum);
        if (forum.user.toString() === user.id) {
            await Forum.findByIdAndDelete(quest_id);
        } else {
            throw new ClientError("You cannot delete this question!")
        }
    } catch (err) {
        console.log("errrrrrrrr : ", err);
        throw err;
    }
}