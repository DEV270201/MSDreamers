const joi = require('joi');
const { ClientError } = require('../utils/AppErrors');

exports.UserRegistrationJoi = async (body)=>{
    const schema = joi.object({
        name : joi.string().required(),

        email : joi.string().regex(/^[a-z0-9\.]+@somaiya.edu$/).required().error(new ClientError("Sign up through somaiya account!!")),

        // password : joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/).min(6).max(10).required(),
        password : joi.string().min(6).max(20).required().error(new ClientError("passowrd must be greater than 6 characters and less than 20 characters")),
        // password : joi.string().regex(//)).min(6).max(10).required(),


        phoneNumber : joi.number().min(1111111111).max(9999999999).required().error(new ClientError("Please enter your number properly!")),

        securityWord : joi.string().required(),

        exams: {
            gre: joi.boolean().required(),
            ielts: joi.boolean().required(),
            toefl: joi.boolean().required()
        }

    });

    return await schema.validateAsync(body);
}

exports.UserLoginJoi = async (body)=>{

    const schema = joi.object({
        email : joi.string().email().required(),
        password : joi.string().required(),
        securityWord : joi.string().required()
    });

    return schema.validateAsync(body);
}
