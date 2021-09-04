const express = require('express');
const router = express.Router();
const {getQuotes} = require("../controller/QuotesController");

router.get("/" , async (req,res,next)=>{
    try{
        const quote = await getQuotes();

        res.status(200).json({
            status : "success",
            quote,
        });

    }catch(err){
        console.log(err);
        return next(err);
    }
});

module.exports = router;