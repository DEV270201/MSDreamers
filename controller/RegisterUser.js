const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');

const RegisterUser = async (res, userDetails) => {
    const { name, email, phoneNumber, password, securityWord, exams } = userDetails;
    try {

        const user = new User({
            name, 
            email, 
            phoneNumber, 
            password, 
            securityWord, 
            exams
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();

        return true;

    } catch (err) {
        console.log("error : " , err);
    }
}
module.exports = RegisterUser;