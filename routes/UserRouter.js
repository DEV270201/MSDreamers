const express = require('express');
const axios = require("axios");
const qs = require('qs');

const {
  UserRegistrationJoi,
  UserLoginJoi,
  UserPasswordChangeJoi,
  UserPasswordResetJoi,
  GoogleRegistrationJoi,
  EditProfileJoi
} = require('../joi/UserJoi');
const {
  RegisterUser,
  LoginUser,
  GoogleSignIn,
  VerifyEmailAccount,
  RegisterGoogleUser
} = require('../controller/AuthController');
const {
  ResetPassword,
  ForgetPassword,
  ChangePassword,
} = require('../controller/UserController');
const router = express.Router();
const auth = require('../auth/Auth');
const { Limiter } = require('../auth/Limiter');


router.post('/register', Limiter(15 * 60 * 1000, 5), async (req, res, next) => {
  try {
    console.log('in the register route');
    const userObject = await UserRegistrationJoi({ ...req.body });
    await RegisterUser(userObject);

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully!',
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

router.post('/googleRegister', Limiter(15 * 60 * 1000, 5), async (req, res, next) => {
  try {
    const userObject = await GoogleRegistrationJoi({ ...req.body });
    await RegisterGoogleUser(userObject);

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully!',
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

router.post('/login', [Limiter(15 * 60 * 1000, 5)], async (req, res, next) => {
  try {
    const login = await UserLoginJoi(req.body);
    const user_id = await LoginUser(login, res, next);

    res.status(200).json({
      status: 'success',
      message: 'User logged in successfully!',
      data: user_id,
    });
  } catch (err) {
    console.log('Error : ', err);
    return next(err);
  }
});

router.post(
  '/googleSignIn',
  Limiter(15 * 60 * 1000, 5),
  async (req, res, next) => {
    try {

      let token = { ...req.body };
      const userDetails = await GoogleSignIn(token,res);

      if (userDetails) {
        res.status(200).json({
          status: 'success',
          details: userDetails,
        });
      } else {
        res.status(200).json({
          status: 'success',
          message: 'User successfully signed in!',
        });
      }
    } catch (err) {
      console.log(err);
      return next(err);
    }
  }
);

router.get('/reCaptcha', async(req,res,next)=> {
  try {
    let token = req.headers['token'];
   
    //sending the token to the google server
    url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
    const response = await axios.post(url);

    res.status(200).json({
      status: 'success',
      response: response.data.success,
    });

  } catch (err) {
    console.log(err);
    return next(err);
  }
})


router.get(
  '/verifyAccount/:token',
  Limiter(15 * 60 * 1000, 5),
  async (req, res, next) => {
    try {

      let token = String(req.params.token);
      await VerifyEmailAccount(token);
      res.status(200).json({
        status: 'success',
        message: 'Your account has been verified successfully!',
      });
    } catch (err) {
      console.log('error : ', err);
      return next(err);
    }
  }
);

router.post(
  '/changePassword',
  [auth, Limiter(15 * 60 * 1000, 5)],
  async (req, res, next) => {
    try {
      const { password, newPassword } = await UserPasswordChangeJoi({
        ...req.body,
      });
      await ChangePassword(req.user, password, newPassword);
      res.status(200).json({
        status: 'success',
        message: 'Password reset successful!',
      });
    } catch (err) {
      console.log('errr : ', err);
      return next(err);
    }
  }
);

router.post(
  '/forgotPassword',
  Limiter(15 * 60 * 1000, 5),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      await ForgetPassword(email, next);
      console.log("aa gya end tak..");
      res.status(200).json({
        status: 'success',
        message: 'Password reset link has been sent to your email!',
      });
    } catch (err) {
      console.log('errr : ', err);
      return next(err);
    }
  }
);

router.post(
  '/resetPassword/:token',
  Limiter(15 * 60 * 1000, 5),
  async (req, res, next) => {
    try {
      let token = String(req.params.token);
      let { password } = await UserPasswordResetJoi({ ...req.body });
      await ResetPassword(token, password);

      res.status(200).json({
        status: 'success',
        message: 'User password changed successfully. Please proceed towards login!',
      });
    } catch (err) {
      console.log('errr : ', err);
      return next(err);
    }
  }
);

router.patch("/profile",[auth, Limiter(15 * 60 * 1000, 5)],async (req,res,next)=>{
      const profileObj = await EditProfileJoi({...req.body});
      await EditProfile(req, profileObj);
      
      res.status(200).json({
         status : "success",
         message : "Profile updated successfully!"
      });
});

module.exports = router;


