import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import "../css/Register.css";
import { SpinnerInfinity } from 'spinners-react';
import { Button } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import GoogleIcon from '../Icons/GoogleIcon';
import CLIENT_ID from '../config/conf';
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {

  let history = useHistory();
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    securityQuestion: "What is the name of your first pet?",
    securityWord: "",
    gre: true,
    ielts: false,
    toefl: false,
  });

  const [key, setKey] = useState();
  const [load, setLoad] = useState(false);
  const [captcha, setcaptcha] = useState(false);

  const changeExam = (event) => {
    const { name } = event.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: !data[name]
      };
    });
  }

  const update = (event) => {
    const { name, value } = event.target;

    setData((prevData) => {
      return {
        ...prevData,
        [name]: value
      };
    });
  }

  const googleSuccess = async (res) => {
    let re = new RegExp('^[a-z0-9.]+@somaiya.edu$');
    if (!re.test(res.profileObj.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please use somaiya account to register'
      });
      return;
    }
    try {
      // <Redirect to="/" />
      history.push("/googleRegister", {
        profileObj: res.profileObj
      });
    } catch (err) {
      console.log(err)
    }
  };

  const googleFailure = (err) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong! ):'
    });
  };

  const submit_form = async (event) => {
    //send the data to the backend
    try {
      if (data.password !== data.confirmPassword) {
        setKey("password");
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Passwords do not match.'
        });
        setData((prevState) => {
          return { ...prevState, password: "", confirmPassword: "" }
        });
        return
      }
      event.preventDefault();
      let postData = {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        securityQuestion : data.securityQuestion,
        securityWord: data.securityWord,
        exams: {
          "gre": true,
          "toefl": data.toefl,
          "ielts": data.ielts
        },
      }

      if (!captcha) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Captcha cannot be verified...',
        });
        return;
      }

      setLoad(true);
      let res = await axios.post("/users/register", postData);
      console.log("RESSSSSULTT : ", res);
      setLoad(false);

      setData({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        confirmPassword: "",
        securityQuestion : "What is the name of your first pet?",
        securityWord: "",
        exams: {
          "gre": true,
          "toefl": false,
          "ielts": false
        }
      });

      if (res.data.status === 'success') {
        Swal.fire(
          {
            icon: 'success',
            title: 'To continue, please check your email and verify your account.',
          }
        )
        history.push('/login');
      }

    } catch (err) {
      setLoad(false);
      setcaptcha(false);
      if (err.response.data.name === "JoiError") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message.msg,
        });

        //dynamically setting the state
        setKey(err.response.data.message.error);
        if (err.response.data.message.error === "password") {
          setData((prevState) => {
            return { ...prevState, password: "", confirmPassword: "" }
          });
        } else {
          setData((prevState) => {
            return { ...prevState, [err.response.data.message.error]: "" }
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message,
        });
      }
    }
  }

  //implementing the captcha function
  const onChangeReCaptcha = async (token) => {
    //sending the token to the backend for verification
    try {
      const resp = await axios.get("http://localhost:4000/users/recaptcha",
        {
          'headers': { token: token }
        });
      setcaptcha(resp.data.response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {
        load ?
          <>
            <div className="register_load">
              <div className="loader">
                {/* <div> */}
                <SpinnerInfinity
                  size={75}
                  thickness={150}
                  color="#161b22" />
                <h6 className="register_load_h6">This may take a moment....</h6>
              </div>
            </div>
          </>
          :
          <div>
            <br></br>
            <br></br>
            <div className="my-3">
              <h3 className="contact_h3 text-center mt-5">SIGN UP FOR FREE!!</h3>
            </div>
            <hr></hr>
            <div className="d-flex justify-content-center cust-btn">
              <GoogleLogin
                clientId={CLIENT_ID}
                render={(renderProps) => (
                  <Button
                    color='default'
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    startIcon={<GoogleIcon />}
                    variant='outlined'
                  >
                    Sign up with Google
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy={'single_host_origin'}
              />
            </div>
            <div className="d-flex justify-content-center">
              <h6 className="or m-3">OR</h6>
            </div>
            <div className="container contact">
              <div className="row">
                <div className="col-md-6 col-11 mx-auto">
                  <form onSubmit={submit_form}>
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Full Name: </label>
                      <input type="text" onChange={update} className="form-control myform" id="name" name="name" value={data.name} required placeholder="Enter your name" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Email address:</label>
                      <input type="email" onChange={update} className={"form-control myform " + ("email" === key ? "error" : null)} id="email" name="email" value={data.email} required placeholder="Enter your email id" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Mobile Number:</label>
                      <input type="text" onChange={update} className={"form-control myform " + ("phoneNumber" === key ? "error" : null)} id="phoneNumber" name="phoneNumber" value={data.phoneNumber} required placeholder="Enter your mobile number" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Password:</label>
                      <input type="password" onChange={update} className={"form-control myform " + ("password" === key ? "error" : null)} id="password" name="password" value={data.password} required placeholder="Enter your password" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Confirm Password:</label>
                      <input type="password" onChange={update} className={"form-control myform " + ("password" === key ? "error" : null)} id="confirmPassword" name="confirmPassword" value={data.confirmPassword} required placeholder="Enter your confirm password" />
                    </div>
                      <div className="mb-3">
                        <label htmlFor="securityQuestion" className="form-label">Select Security Question:</label>
                        <select name="securityQuestion" className="custom-select" value={data.securityQuestion} id="securityQuestion"  onChange={update}>
                          <option value="What is the name of your first pet?">What is the name of your first pet?</option>
                          <option value="What was the brand of your first car?">What was the brand of your first car?</option>
                          <option value="What elementary school did you attend?">What elementary school did you attend?</option>
                          <option value="What is the name of the town where you were born?">What is the name of the town where you were born?</option>
                          <option value="Where was your best family vacation as a kid?">Where was your best family vacation as a kid?</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Answer:</label>
                        <input type="text" onChange={update} className="form-control myform " id="securityWord" name="securityWord" value={data.securityWord} placeholder="Enter your security word" required />
                      </div>
                    <label className="form-label">Choose Exams: </label>
                    <div className="d-flex justify-content-between">
                      <div className="custom-control custom-switch">
                        <input type="checkbox" className="custom-control-input" id="gre" checked disabled />
                        <label className="custom-control-label" htmlFor="gre">GRE</label>
                      </div>
                      <div className="custom-control custom-switch">
                        <input type="checkbox" className="custom-control-input" id="toefl" name="toefl" onChange={changeExam} />
                        <label className="custom-control-label" htmlFor="toefl">TOEFL</label>
                      </div>
                      <div className="custom-control custom-switch">
                        <input type="checkbox" className="custom-control-input" id="ielts" name="ielts" onChange={changeExam} />
                        <label className="custom-control-label" htmlFor="ielts">IELTS</label>
                      </div>
                    </div>
                    <ReCAPTCHA
                      sitekey={process.env.REACT_APP_SITE_KEY}
                      onChange={onChangeReCaptcha}
                      className="mt-3"
                    />
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn_reg ">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  );
}

export default Register;

