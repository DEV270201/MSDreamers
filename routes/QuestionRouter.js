const express = require("express");
const router = express.Router({mergeParams : true});
const {Limiter} = require("../auth/Limiter");

const {
    getQuestionDetails,
    addAnswer,
    likeQuestion,
    deleteQuestion,
    deleteAnswer,
    upvoteAnswer
} = require('../controller/ForumController');
const auth = require('../auth/Auth');

//For a particular forum
router.get("/",Limiter(15 * 60 * 1000, 50) ,async(req,res,next)=>{
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

router.post("/addanswer", [auth,Limiter(5 * 60 * 1000, 3)], async(req,res,next)=>{
    try{
        await addAnswer(req);
        res.status(201).json({
            status: "success",
            message: "Answer added!"
        })

    }catch(err){
        console.log("errrrr : ", err);
        return next(err);
    }
});

router.patch("/likequestion", auth, async(req,res,next)=>{
    try{
       
       let quest_id = req.params.id; 
       await likeQuestion(req,quest_id);
       
       res.status(200).json({
           status : "success"
       });
       
    }catch(err){
        console.log("errrrr : ", err);
        return next(err);
    }
});

router.delete("/deleteanswer/:ans_id", auth, async(req,res,next)=>{
   try {
    let quest_id = req.params.id;
    await deleteAnswer(req,quest_id);
    res.status(204).json({
        status : "success",
    });
    
   } catch (err) {
        console.log("Error: ", err);
        return next(err);
   } 
});

router.delete("/deletequestion", auth, async(req, res, next) => {
    try {
        let quest_id = req.params.id;
        await deleteQuestion(req,quest_id);
        res.status(204).json({
            status : "success",
        });
         
    } catch (err) {
        console.log("Error: ", err);
        return next(err);
    }
})

router.patch("/upvoteanswer/:answer_id", auth, async(req,res,next)=>{
    try{
        const quest_id = req.params.id;
        await upvoteAnswer(req, quest_id);

        res.status(200).json({
            status: "success",
        })
    }catch(err){
        console.log("errrrr : ", err);
        return next(err);
    }
});

module.exports = router;