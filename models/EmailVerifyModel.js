const mongoose = require('mongoose');
const crypto = require("crypto");

const EmailVerifySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    token: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        index: {expires: 120*1000}
    }
});

EmailVerifySchema.methods.generateRandomToken = function(){

    let token = crypto.randomBytes(64).toString("hex");

    let hashToken = crypto.createHash("SHA256").update(token).digest("hex");

    this.token = hashToken;

    return token;

}

module.exports = mongoose.model("EmailVerify", EmailVerifySchema);