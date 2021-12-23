import React, {useState} from 'react';
import axios from 'axios';
import { useHistory,NavLink } from "react-router-dom";
import { SpinnerInfinity } from 'spinners-react';
import { Button } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import GoogleIcon from '../Icons/GoogleIcon';
import CLIENT_ID from '../config/conf';
import Swal from 'sweetalert2';
import "../css/Register.css";


export default function Login() {

    const [data, setData] = useState({
        email: "",
        password: "",
        securityWord: "",
      });

    const [key, setKey] = useState();
    const [load, setLoad] = useState(false);
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
          let resp = await axios.post('/users/googleSignIn', {
            token: res.tokenId,
          });
          setLoad(false);
          if (resp.data.status === 'success') {
            Swal.fire(
              {
                icon: 'success',
                title: 'You have been logged in successfully!',
              }
            )
            history.push('/');
          }
        } catch (err) {
          console.log(err);
        }
      };

    const googleFailure = (err) => {
        console.log(err);
        console.log('Sign in unsuccessful!');
    };

    const submit_form = async (event) => {
        //send the data to the backend
        try {
          event.preventDefault();
          let postData = {
            email : data.email,
            password: data.password,
            securityWord: data.securityWord,
          }
          setLoad(true);
          let res = await axios.post("/users/login", postData);
          console.log("RESSSSSULTT : ", res);
          setLoad(false);
    
          setData({
            email: "",
            password: "",
            securityWord: "",
          });
    
          if (res.data.status === 'success') {
            Swal.fire(
              {
                icon: 'success',
                title: 'You have been logged in successfully!',
              }
            )
            history.push('/');
          }
    
        } catch (err) {
          setLoad(false);
          console.log("ERRORRRRR", err);
          if (err.response.data.name === "JoiError") {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.message.msg,
            });
    
            //dynamically setting the state
            setKey(err.response.data.message.error);
            
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.message,
            });
          }
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
                    <form>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address:</label>
                        <input type="email" onChange={update} className={"form-control myform " + ("email" === key ? "error" : null)} id="email" name="email" value={data.email} required placeholder="Enter your email id" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Password:</label>
                        <input type="password" onChange={update} className={"form-control myform " + ("password" === key ? "error" : null)} id="password" name="password" value={data.password} required placeholder="Enter your password" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Security Word:</label>
                        <input type="password" onChange={update} className="form-control myform " id="securityWord" name="securityWord" value={data.securityWord} placeholder="Enter your security word" required />
                      </div>
                      <div className="mb-3">
                       <p className='login_fp' style={{textDecoration : 'none',color : "#161b22"}}><NavLink to="/forgotPassword">Forgot Password?</NavLink></p>
                      </div>
                      <div className="d-flex justify-content-center">
                      <button className="btn btn_reg " onClick={submit_form} >Submit</button>
                    </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        }
      </>
    )
}

