const User = require('../models/UserModel');
const EmailVerify = require('../models/EmailVerifyModel');
const { ClientError, AuthorizationError } = require('../utils/AppErrors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const sendEmail = require('../utils/Email');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const ejs = require('ejs');
// const VerifyEmailEJS = require("../templates/VerifyEmail.ejs")

const client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

const signJWT = async (user_id) => {
  return await promisify(jwt.sign)(user_id, process.env.JWT_SECRET);
};

//only for regular signup
exports.RegisterUser = async (userDetails) => {
  try {
    const { name, email, phoneNumber, password, securityWord, exams } =
      userDetails;
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      throw new ClientError('User already exists!');
    }

    //same for google login and regular email
    const user = new User({
      name,
      email,
      phoneNumber,
      password,
      securityWord,
      exams,
      active: true,
      googleLogin: false,
    });

    const salt = await bcrypt.genSalt(10);
    user.securityWord = await bcrypt.hash(securityWord, salt);
     user.password = await bcrypt.hash(password, salt);
      try {
        const verifyEmail = new EmailVerify({
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          password: user.password,
          securityWord: user.securityWord,
          exams: user.exams,
        });

        let token = verifyEmail.generateRandomToken();

        const subject = `Verification Email!!`;
        const uri = `http://localhost:3000/verifyAccount/${token}`;
        let data = await ejs.renderFile(
          `./templates/VerifyEmail.ejs`,
          { uri: uri },
          { async: true }
        );
        await verifyEmail.save();
        try{
          await sendEmail(email, subject, data);
        } catch (err) {
          console.log(err)
          throw new Error("Server error. Please try again after some time.");
        }
      } catch (err) {
        throw err;
      }
    return;
  } catch (err) {
    console.log('error : ', err);
    throw err;
  }
};

//created a different register route for google users
exports.RegisterGoogleUser = async (userDetails)=>{
  try {
    const { name, email, phoneNumber,exams } = userDetails;
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      throw new ClientError('User already exists!');
    }

    //for google sign up
    const user = new User({
      name,
      email,
      phoneNumber,
      exams,
      active: true,
      googleLogin: true,
    });

    await user.save();
    return;

  } catch (err) {
    console.log('error : ', err);
    throw err;
  }
}

exports.LoginUser = async (login, res, next) => {
  try {
    const { email, password, securityWord } = login;
    const user = await User.findOne({ email });

    if (!user) {
      throw new ClientError('Invalid credentials!');
    }
    
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    const isSecurityWordMatch = await bcrypt.compare(
      securityWord,
      user.securityWord
    );

    if (!isPasswordMatch || !isSecurityWordMatch) {
       throw new ClientError('Invalid credentials!');
    }

    const payload = {
      id: user.id,
    };

    const token = await signJWT(payload.id);

    //it will set the cookie in the browser
    res.cookie('jwt', token, {
      httpOnly: true,
      expires : new Date(Date.now() + 8 * 3600000)
    });

    return user.id;
  } catch (err) {
    console.log("heyyy");
    console.log('Error : ', err);
    throw err;
  }
};

/* After signing in from google, user is directed to register page. 
After submitting, details are sent to this route.*/

exports.GoogleSignIn = async (body,res) => {
  try {
    // console.log('Token : ', body.token);
    const response = await client.verifyIdToken({
      idToken: body.token,
      audience: process.env.CLIENT_ID,
    });
    //it will print the user details
    //   console.log("user payload : " , response.getPayload());
    console.log('Response : ', response);
    let payload = response.getPayload();

    if (payload.email_verified) {
      if (payload.hd === 'somaiya.edu') {
        const user = await User.findOne({ email: payload.email, googleLogin: true });
        if (user) {
            const token = await signJWT(user.id);
            res.cookie('jwt', token, {
              httpOnly: true,
              secure: false,
              expires : new Date(Date.now() + 8 * 3600000)
            });
            return;
          }
         else {
            throw new AuthorizationError(
              'Google account is not linked for this email id!'
            );
          }
      } else {
        throw new AuthorizationError('please use somaiya mail id to login!');
      }
    } else {
      throw new AuthorizationError('user not verified!');
    }
  } catch (err) {
    console.log('in the user controller : ', err);
    throw err;
  }
};

// Delete EmailVerify model and use indexing and token expiry in user model
exports.VerifyEmailAccount = async (token) => {
  try {
    let hashedToken = crypto.createHash('SHA256').update(token).digest('hex');
    let user = await EmailVerify.findOne({ token: hashedToken });

    if (!user) {
      throw new AuthorizationError('Invalid Url/token');
    }

    //storing in the original database
    await User.create({
      name: user.name,
      phoneNumber: user.phoneNumber,
      email: user.email,
      password: user.password,
      securityWord: user.securityWord,
      active: true,
      exams: user.exams,
    });

    //deleting from the temporary database
    await EmailVerify.findByIdAndDelete(user.id);
    return;
  } catch (err) {
    console.log('errorrr : ', err);
    throw err;
  }
};



