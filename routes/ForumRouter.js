const express = require("express");
const router = express.Router();
const {allQuestions,addQuestion} = require('../controller/ForumController');
const auth = require("../auth/Auth");

//redirecting the route if question/:id exists
router.use("/question/:id" , require("./QuestionRouter"));

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

module.exports = router;