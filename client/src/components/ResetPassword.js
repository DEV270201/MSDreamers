import React, { useState } from 'react'
import axios from 'axios';
import "../css/Register.css";
import { SpinnerInfinity } from 'spinners-react';

function ResetPassword(props) {

    const [password, setPassword] = useState("");
    const [confpassword, setConfPassword] = useState("");
    const [msg, setMsg] = useState({
        type: "neutral",
        text: ""
    });
    const [load, setLoad] = useState(false);

    const updatePass = (event) => {
        setPassword(event.target.value);
    }

    const updateConfPass = (event) => {
        setConfPassword(event.target.value);
    }

    const submit_form = async () => {
        try {
            setLoad(true);
            if (password.trim() !== confpassword.trim() || password.trim() === "") {
                setMsg({
                    type: "negative",
                    text: "Passwords do not match!"
                });
                setLoad(false);
                return;
            }
            let resp = await axios.post(`/users/resetPassword/:${props.match.params.token}`, {
                password: password
            });

            setMsg({ text: resp.data.message, type: "positive" });
            setLoad(false);
            setPassword("");
            setConfPassword("");


        } catch (err) {
            console.log("Errororororror : ", err);
            setLoad(false);
            setMsg({
                type: 'negative',
                text: err.response.data.message
            })
        }
    }

    return (
        <div className='row' style={{ height: "80vh" }}>
            <div className='col-md-6 col-11 mx-auto my-auto'>
                <br />
                <br />
                <h4 className='text-center'>Reset Password</h4>
                <hr />
                <div className="mb-3 my-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                    <input type="password" onChange={updatePass} className="form-control myform pass_inp" id="password" name="password" value={password} required placeholder="Enter your password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Confirm Password</label>
                    <input type="password" onChange={updateConfPass} className="form-control myform conf_inp" id="confpassword" name="confirmpassword" value={confpassword} required placeholder="Confirm your password" />
                </div>
                <div className="d-flex justify-content-center">

                    <button className="btn btn_reg " onClick={submit_form} >
                        {
                            load ?
                                <SpinnerInfinity
                                    size={50}
                                    thickness={100}
                                    color="#161b22" /> :
                                <span>Submit</span>
                        }
                    </button>
                </div>

                <div className={'shadow mt-3 ' + msg.type}>
                    <p><i className={msg.type === "negative" ? "fa-solid fa-circle-xmark mr-2" : "fa-solid fa-circle-check mr-2"}></i>{msg.text}</p>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;
