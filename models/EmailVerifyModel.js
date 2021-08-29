const mongoose = require('mongoose');
const crypto = require("crypto");

const EmailVerifySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true , "Name is required!"]
    },
    email : {
        type : String,
        required : [true , "Please enter the email id!"],
        unique : [true, "This email id already exists!"]
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Phone number is required!']
    },
    password: {
        type: String,
        // required: [true, 'Password is required!']
    },
    securityWord: {
        type: String,
        required: [true, 'Security word is required!']
    },
    exams: {
        gre: {
            type: Boolean,
            default: false
        },
        toefl: {
            type: Boolean,
            default: false
        },
        ielts: {
            type: Boolean,
            default: false
        }
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