const mongoose = require("mongoose");

const UserScoreSchema = new mongoose.Schema({
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
   },
   score : {
       type : Number,
       required : [true,"Please enter the score!"],
       default : 0
   },
   subject : {
    type : String,
   },
   test: [
       {
           question: {
               type: String,
               required: [true, 'Question is required!']
           },
           userAnswer : {
               type : String,
               required : [true , "Please provide user's answer!"],
           },
           correctAnswer: {
               type: String,
               required: [true, "Please provide correct answer!"]
           }
       }
   ],
   testNumber: {
       type: Number,
       required: [true, 'Please provide test number!']
   }
});

const UserScore = mongoose.model("UserScore" , UserScoreSchema);


module.exports = UserScore;