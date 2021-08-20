const express = require('express');
const auth = require('../auth/Auth');
const {getWords} = require('../controller/WordController');
const {VocabWords} = require('../controller/WordController');

const router = express.Router()

router.get('/',auth, async (req, res, next) => {
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

//---------------FOR ADDING THE WORD INTO THE LIST-------------------------
// router.post("/addword" , async (req,res)=>{

//     await WordList.create(req.body);

//     res.json({
//         status : "success"
//     })
     
// })

//-------------------------------------------------------------------------

router.post('/', auth, async (req, res, next) => {
    try{
        const wordObject = await VocabWords(req, res, next);
        res.status(201).json({
            status : "success",
            message : "User dictionary updated!"
        });
    }catch(err){
       console.log("Error : " , err);
       return next(err);
    }
});

module.exports = router;



