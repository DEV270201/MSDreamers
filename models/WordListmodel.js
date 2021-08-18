const mongoose = require("mongoose");

const WordListSchema = new mongoose.Schema({
    word: String,
    type: String,
    meaning : String,
    sentence : String
});

const WordList = mongoose.model("WordList" , WordListSchema);


module.exports = WordList;