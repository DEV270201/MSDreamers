import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../css/Register.css";
import { SpinnerInfinity } from 'spinners-react';

function ForgotPassword() {
    const [load, setLoad] = useState(false);
    const [email, setEmail] = useState('');
    const [key, setKey] = useState();
    const [msg, setMsg] = useState(false);

    const update = (event) => {
        const { value } = event.target;
        setEmail(value);
    }

    const forgotPassword = async (event) => {
        setLoad(true);
        try {
            event.preventDefault();
            let resp = await axios.post('/users/forgotPassword', {
                email: email
            });

            if (resp.data.status === 'success') {
                setMsg(true);
                setLoad(false);
            }
        } catch (err) {
            console.log(err.response.data.message);
            setLoad(false);
            setKey("email");
            setEmail("");
            setMsg(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data.message,
            });
        }
    }
    return (
        <>
            <br></br>
            <br></br>
            <div className='main_div' style={{height:'100vh',width:'100vw'}}>
            <div className="my-3">
                <h3 className="contact_h3 text-center mt-5">Password Reset</h3>
                <h6 className='h6_fp text-center mt-3 mb-3' style={{ color: "#161b22" }}>Enter your the email address that you used to register. We'll send you an email with a link to reset your password.</h6>
            </div>
            <hr></hr>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-11 mx-auto">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Email address:</label>
                                <input type="email" onChange={update} className={"form-control myform " + ("email" === key ? "error" : null)} id="email" name="email" value={email} required placeholder="Enter your email id" />
                            </div>
                            <div className="content_div">
                                {msg ?
                                    <>
                                        <button className="btn btn_reg" onClick={forgotPassword} disabled>
                                            Send
                                        </button>
                                        <div className='positive shadow mt-3'>
                                            <p><i className="fa-solid fa-circle-check mr-2"></i>Please check your email inbox for a link to complete the reset.</p>
                                        </div>
                                      </>
                                    :
                                    <button className="btn btn_reg" onClick={forgotPassword}>
                                        {load ?
                                            <SpinnerInfinity
                                                size={50}
                                                thickness={100}
                                                color="#161b22" />
                                            :
                                            <span>Send</span>
                                        }
                                    </button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default ForgotPassword;
