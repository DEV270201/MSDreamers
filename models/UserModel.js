const mongoose = require('mongoose');
const sendEmail = require("../utils/Email");
const ejs = require("ejs");

// Created a user model
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true , "Name is required!"]
    },
    profile_pic: {
            url: {
                type: String,
                default: "https://res.cloudinary.com/dmvn8cgbc/image/upload/v1643910109/Profile%20pictures/default_vpff8u.png"
            },
            public_id: {
                type: String,
                default : "Profile pictures/default_vpff8u"
            }
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
    },
    googleLogin: {
        type: Boolean,
        default: false
    },
    securityWord: {
        type: String,
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
    passwordResetToken : String,
    passwordResetExpire : Date,
});

//for sending the emails on successful user registration
UserSchema.post("save" , async function(doc,next){
    try{
        const subject = `Welcome to MsDreamers!`;
        let data = await ejs.renderFile(`./templates/WelcomeMail.ejs`, { name: doc.name },{async:true});
        await sendEmail(doc.email,subject, data);
    }catch(err){
        console.log("from user model post : " , err);
        return next(err);
    }
});

const User = mongoose.model("User" , UserSchema);

module.exports = User;