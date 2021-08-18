const mongoose = require('mongoose');

//created a user model
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
        require: [true, 'Phone number is required!']
    },
    password: {
        type: String,
        require: [true, 'Password is required!']
    },
    securityWord: {
        type: String,
        reuire: [true, 'Security word is required!']
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
});

const User = mongoose.model("User" , UserSchema);

modules.export = User;