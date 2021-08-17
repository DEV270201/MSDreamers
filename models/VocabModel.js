const mongoose = require("mongoose");

const VocabSchema = new mongoose.Schema({
   
});

const Vocab = mongoose.model("Vocab" , VocabSchema);


module.exports = Vocab;