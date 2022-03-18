const mongoose = require("mongoose");

const ForumSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Question is required!']
    },
    desc:{
        type: String,
        required: [true, 'Question is required!']
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    //embeded like document
    //storing the reference of the user who has liked the question
    likes: [
        {
            user: {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User"
            },
        }
],  
    answers: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            answer: {
                type: String,
                required: [true, "Please provide an answer!"]
            },
            date: {
                type: Date,
                default: Date.now()
            },
            upvotes: [
                {
                    user: {
                        type : mongoose.Schema.Types.ObjectId,
                        ref : "User"
                    },
                }
            ]
        }
    ]

});

const Question = mongoose.model("Forum", ForumSchema);


module.exports = Question;