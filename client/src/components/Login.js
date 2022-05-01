import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, NavLink } from "react-router-dom";
import { SpinnerInfinity } from 'spinners-react';
import { Button } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import GoogleIcon from '../Icons/GoogleIcon';
import CLIENT_ID from '../config/conf';
import Swal from 'sweetalert2';
import "../css/Register.css";
import ReCAPTCHA from "react-google-recaptcha";

axios.defaults.withCredentials = true;

export default function Login(obj) {

  const [alert, setAlert] = useState();

  useEffect(() => {
    if (obj.location.state) {
      setAlert(obj.location.state.alert);
    }
  },[obj.location.state]);

  const [data, setData] = useState({
    email: "",
    password: "",
    question: "",
    answer: ""
  });

  const [key, setKey] = useState();
  const [load, setLoad] = useState(false);
  const [captcha,setcaptcha] = useState(false);
  let history = useHistory();

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
    try {
      setLoad(true);
      await axios.post('/users/googleSignIn', {
        token: res.tokenId,
      });
      setLoad(false);
      Swal.fire(
        {
          icon: 'success',
          title: 'You have been logged in successfully!',
        }
      )
      history.push('/');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response.data.message
      });
      setLoad(false);
    }
  };

  const googleFailure = (err) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Sign in unsuccessful!'
    });
  };

  const submit_form = async (event) => {
    //send the data to the backend
    try {
      event.preventDefault();
      let postData = {
        email: data.email,
        password: data.password,
      }

      if(!captcha){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Captcha cannot be verified...',
        });
        return;
      }
      setLoad(true);
      // let res = await axios.post("/users/login", postData);
      let res = await axios.post("/users/2FA",postData);
      setLoad(false);
      
      if (res.data.status === 'success') {
        setData((prevState)=>{ return {...prevState,question: res.data.data}});
      }
      try {
        window.$('#answerModal').modal('show');
        
      } catch (err) {
        console.log("Error: ",err)
      }

    } catch (err) {
      setLoad(false);
      if (err.response.data.name === "JoiError") {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message.msg,
        });

        //dynamically setting the state
        setKey(err.response.data.message.error);
      } else {
        setcaptcha(false);
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
      const resp = await axios.get("http://localhost:4000/users/recaptcha",{
       "headers" : {token: token}
      });
      setcaptcha(resp.data.response);
    } catch (err) {
      setcaptcha(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response.data.message,
      });
    }
  }

  const submit_func = async()=>{
     try{
       let resp = await axios.post("http://localhost:4000/users/login",{
         securityWord : data.answer,
         email : data.email
       });
       
       if(resp.data.status === 'success'){
          setData({
            email: "",
            password: "",
            question: "",
            answer: ""
          });
        Swal.fire(
          {
            icon: 'success',
            title: 'You have been logged in successfully!',
          }
        )
        window.$('#answerModal').modal('hide');
        history.push('/');
       }

     }catch(err){
        console.log("err : ",err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message,
        });
     }
  }

  return (
    // <>
    <div style={{minHeight:"80vh"}}>
      <div className="modal fade" id="answerModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">{data.question}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input className="form-control myform" type="text" onChange={update} value={data.answer} name="answer" placeholder="Enter answer..."></input>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={submit_func}>Submit</button>
              </div>
            </div>
          </div>
        </div>
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
            <br />
            {
              alert &&
              <>
              <br/>
              <div className="alert alert-success alert-dismissible fade show mt-2" role="alert">
                {alert}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              </>
            }
            <div>
              <h3 className="contact_h3 text-center mt-5">Login</h3>
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
                    Login with Google
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
                      <label htmlFor="exampleFormControlInput1" className="form-label">Email address:</label>
                      <input type="email" onChange={update} className={"form-control myform " + ("email" === key ? "error" : null)} id="email" name="email" value={data.email} required placeholder="Enter your email id" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Password:</label>
                      <input type="password" onChange={update} className={"form-control myform " + ("password" === key ? "error" : null)} id="password" name="password" value={data.password} required placeholder="Enter your password" />
                    </div>
                    <div className="mb-3">
                      <p className='login_fp' style={{ textDecoration: 'none', color: "#161b22" }}><NavLink to="/forgotPassword">Forgot Password?</NavLink></p>
                    </div>
                    <ReCAPTCHA
                      size="normal"
                      sitekey={process.env.REACT_APP_SITE_KEY}
                      onChange={onChangeReCaptcha}
                    />
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn_reg mb-2">Proceed</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

      }
      </div>
  )
}









