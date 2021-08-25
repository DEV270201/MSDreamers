const mongoose = require("mongoose");

const VocabSchema = new mongoose.Schema({
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
   },
   word: {
       type : mongoose.Schema.Types.ObjectId,
       unique : true,
       ref : 'WordList'
   },
   status: {
       type: Boolean,
       default: false
   }
});

const Vocab = mongoose.model("Vocab" , VocabSchema);


module.exports = Vocab;