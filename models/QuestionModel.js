const mongoose = require("mongoose");

const ForumSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question: {
        type: String,
        required: [true, 'Question is required!']
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    numberOfLikes: {
        type: Number,
        default: 0
    },
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
            upvotes: {
                type: Number,
                default: 0
            }

        }
    ]

});

const Question = mongoose.model("Forum", ForumSchema);


module.exports = Question;