const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({

    subject : {
        type : String,
    },
    testNumber : {
        type : Number,
        default : 1
    },
    questAns : [
        {
            questionImage : String,
            correctAnswer : String,
            questionType : {
                type : String,
                default : "Single"
            },
            noOfOptions : Number
        }
    ]
});

const Test = mongoose.model("Test", TestSchema);

module.exports = Test;