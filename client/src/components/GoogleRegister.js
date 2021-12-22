import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import "../css/Register.css";
import { SpinnerInfinity } from 'spinners-react';

const GoogleRegister = (profileObj) => {


    let history = useHistory();
    let profile = profileObj.location.state.profileObj;
    const [data, setData] = useState({
        name: profile.name,
        email: profile.email,
        phoneNumber: "",
        gre: true,
        ielts: false,
        toefl: false,
    });

    const [key, setKey] = useState();
    const [load, setLoad] = useState(false);

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

    const submit_form = async (event) => {
        //send the data to the backend
        try {
            event.preventDefault();
            let postData = {
                name: data.name,
                email: data.email,
                phoneNumber: data.phoneNumber,
                exams: {
                    "gre": true,
                    "toefl": data.toefl,
                    "ielts": data.ielts
                },
            }

            setLoad(true);
            let res = await axios.post("/users/googleRegister", postData);
            console.log("RESSSSSULTT : ", res);
            setLoad(false);

            setData({
                name: profile.name,
                email: profile.email,
                phoneNumber: "",
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
                        title: 'User registered successfully!',
                    }
                )
                history.push('/login');
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
                            <h3 className="contact_h3 text-center mt-5">Enter your details!</h3>
                        </div>
                        <hr></hr>
                        <div className="container contact">
                            <div className="row">
                                <div className="col-md-6 col-11 mx-auto">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Full Name: </label>
                                            <input type="text" disabled className="form-control myform" id="name" name="name" value={data.name} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Email address:</label>
                                            <input type="email" className="form-control myform" disabled id="email" name="email" value={data.email} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Mobile Number:</label>
                                            <input type="text" onChange={update} className={"form-control myform " + ("phoneNumber" === key ? "error" : null)} id="phoneNumber" name="phoneNumber" value={data.phoneNumber} required placeholder="Enter your mobile number" />
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
    );
}

export default GoogleRegister;

