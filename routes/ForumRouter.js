const express = require("express");
const router = express.Router();
const {allQuestions,addQuestion,getQuestionDetails} = require('../controller/ForumController')
const auth = require("../auth/Auth");
const Filter = require("bad-words");

router.get("/allquestions", async(req,res,next)=>{
     try{
       const questions = await allQuestions();
       
       res.status(200).json({
           status : "success",
           questions
       })
     }catch(err){
         console.log("errrrr : ", err);
         return next(err);
     }
});

//For a particular forum
router.get("/question/:id", async(req,res,next)=>{
    try{
      let quest_id = req.params.id;

      const data = await getQuestionDetails(quest_id);
      
      res.status(200).json({
          status : "success",
          data
      });

    }catch(err){
        console.log("errrrr : ", err);
        return next(err);
    }
});

router.post("/addquestion", auth, async (req,res,next)=>{
    try{
        await addQuestion(req);
        res.status(201).json({
            status: "success",
            message: "Question uploaded!"
        })
    }catch(err){
        console.log("errrrr : ", err);
        return next(err);
    }
});

router.post("/addcomment", auth, async(req,res,next)=>{
    try{

    }catch(err){
        console.log("errrrr : ", err);
        return next(err);
    }
});
router.delete("/deletecomment", auth, async(req,res,next)=>{
    try{

    }catch(err){
        console.log("errrrr : ", err);
        return next(err);
    }
});

router.patch("/likequestion", auth, async(req,res,next)=>{
    try{

    }catch(err){
        console.log("errrrr : ", err);
        return next(err);
    }
});

router.patch("/dislikequestion", auth, async(req,res,next)=>{
    try{

    }catch(err){
        console.log("errrrr : ", err);
        return next(err);
    }
});

router.delete("/deletequestion", auth, async(req,res,next)=>{
    try{

    }catch(err){
        console.log("errrrr : ", err);
        return next(err);
    }
});

module.exports = router;