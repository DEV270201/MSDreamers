const express = require('express');
const auth = require('../auth/Auth');
const {VocabWords,AddToDictionary,getWords,GetFromDictionary,GetUserWords} = require('../controller/WordController');

const router = express.Router();

router.get('/learnword',auth, async (req, res, next) => {
    try{
      const words =  await getWords(req, res, next);
      
      res.status(200).json({
          status : "success",
          words
      });

    }catch(err){
        console.log("in the get words router : " , err);
        return next(err);
    }
});


router.post('/learnword', auth, async (req, res, next) => {
    try{
        await VocabWords(req, res, next);
        res.status(201).json({
            status : "success",
            message : "User dictionary updated!"
        });
    }catch(err){
       console.log("Error : " , err);
       return next(err);
    }
});

//---------------FOR ADDING THE WORD INTO THE LIST-------------------------
// router.post("/addword" , async (req,res)=>{

//     await WordList.create(req.body);

//     res.json({
//         status : "success"
//     })
     
// })

//-------------------------------------------------------------------------

//For getting the  words stored in the vocab model
router.get("/myprepwords" , auth , async (req,res,next)=>{
    try{
       let results =  await GetUserWords(req);
        res.status(200).json({
            status: "success",
            results
        });

    }catch(err){
        console.log("errr : ", err);
        return next(err);
    }
});


//For getting the words stored in the user dictionary
router.get("/dictionary" , auth , async (req,res,next)=>{
    try{
       let results =  await GetFromDictionary(req);
        
        res.status(200).json({
            status: "success",
            results
        });

    }catch(err){
        console.log("errr : ", err);
        return next(err);
    }
});


// For adding words to the dictionary model
router.post('/dictionary', auth, async (req, res, next) => {
    try{
        await AddToDictionary(req);
        
        res.status(201).json({
            status: "success",
            message: "User dictionary updated!"
        });

    }catch(err){
        console.log("errr : ", err);
        return next(err);
    }
});

module.exports = router;



