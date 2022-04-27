const mongoose = require('mongoose');
const TokenGenerator = require('../utils/TokenGenerator')

const EmailVerifySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true , "Name is required!"]
    },
    email : {
        type : String,
        required : [true , "Please enter the email id!"],
        unique : [true, "Email has been sent already. Please verify your email!"]
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Phone number is required!']
    },
    password: {
        type: String,
        // required: [true, 'Password is required!']
    },
    securityQuestion : {
        type : String,
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
        default: Date.now,
        index: {expires: '20m'}
    }
});

EmailVerifySchema.methods.generateRandomToken = function(){

    const {hashToken,token} = TokenGenerator();

    this.token = hashToken;

    return token;

}

module.exports = mongoose.model("EmailVerify", EmailVerifySchema);