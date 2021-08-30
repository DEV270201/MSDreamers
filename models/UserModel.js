const mongoose = require('mongoose');
const sendEmail = require("../utils/Email");

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

//for sending the emails on successful user registration
UserSchema.post("save" , async function(doc,next){
    
    try{

        const subject = `Welcome to Padhai ka app!`
        const content = 
        `
            <h4>Dear ${doc.name},</h4>
            <p> Thankyou for joining the community at <b>Padhai Ka App</b>.<br>
            We will be in touch with you for future oppprotunites and career news that might find interesting.
            <p>
            Padhai Ka App will help you in cracking one of the most difficult entrance exams for pursuing Masters in your dream university.</p>
            <br>
            <h3>Happy Learning, </h3>
            <h5>Padhai Ka App</h5>
            `
        await sendEmail(doc.email , subject, content);
    }catch(err){
        console.log("from user model post : " , err);
        return next(err);
    }
});

const User = mongoose.model("User" , UserSchema);

module.exports = User;