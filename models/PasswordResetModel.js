const mongoose = require('mongoose');


// Created a user model
const PasswordResetSchema = new mongoose.Schema({
      token : String,
      user : {
          type : mongoose.Schema.Types.ObjectId,
          ref : "User"
      },
      createdAt: {
        type: Date,
        default: Date.now(),
        index: {expires: 120*1000}
    }
});

const PasswordReset = mongoose.model("PasswordReset" , PasswordResetSchema);

module.exports = PasswordReset;