const mongoose = require('mongoose');
const crypto = require("crypto");
const {promisify} = require("util");

// Created a user model
const UserSchema = new mongoose.Schema({
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
    googleLogin: {
        type: Boolean,
        default: false
    },
    securityWord: {
        type: String,
        required: [true, 'Security word is required!']
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    },
    numberOfTest : {
        type : Number,
        default : 0,
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
    wordsLearnt: {
        type: Number,
        default: 0
    },
    active : {
        type : Boolean,
        default : false,
    },
});


UserSchema.methods.generateRandomToken = function(){

    let token = crypto.randomBytes(64).toString("hex");

    let hashToken = crypto.createHash("SHA256").update(token).digest("hex");
    this.emailResetToken = hashToken;

    return token;

}

const User = mongoose.model("User" , UserSchema);

module.exports = User;