const mongoose = require("mongoose");

const DictionarySchema = new mongoose.Schema({
    word: String,
    type: String,
    meaning : String,
    sentence : String,
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
});

const  Dictionary = mongoose.model("DictionaryWord" , DictionarySchema);

module.exports = Dictionary;