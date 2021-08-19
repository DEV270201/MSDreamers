const joi = require('joi');

exports.UserRegistrationJoi = async (body)=>{
    const schema = joi.object({
        name : joi.string().required(),

        email : joi.string().regex(/^[a-z0-9\.]+@somaiya.edu$/).required(),

        // password : joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/).min(6).max(10).required(),
        password : joi.string().min(6).max(20).required(),
        // password : joi.string().regex(//)).min(6).max(10).required(),


        phoneNumber : joi.number().min(1111111111).max(9999999999).required(),

        securityWord : joi.string().required(),

        exams: {
            gre: joi.boolean(),
            ielts: joi.boolean(),
            toefl: joi.boolean()
        }

    });

    return await schema.validateAsync(body);
}
