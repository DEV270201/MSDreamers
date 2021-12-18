import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import "../css/Register.css";

// Radio buttons
const Register = () => {
  
  let history = useHistory();
  const [data,setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword : "", 
    securityWord : "",
    exams: {
        "gre": false,
        "toefl": false,
        "ielts": false
    },
  });
  const [key, setKey] = useState();

const update = (event)=>{
    const {name,value} = event.target;
    setData((prevData)=>{
      return {
        ...prevData,
        [name]:value
      };
    });
  }

  const submit_form = async (event)=>{
       //send the data to the backend
       try {
         if (data.password !== data.confirmPassword) {
          setKey("password");
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Passwords do not match.',
          });
          setData({
            password: "",
            confirmPassword: ""
          })
           return
         }
        event.preventDefault();
        let postData = {
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: data.password,
          securityWord : data.securityWord,
          exams: {
              "gre": data.exams.gre,
              "toefl": data.exams.toefl,
              "ielts": data.exams.ielts
          },
        }
        let res = await axios.post("http://localhost:4000/users/register",postData);
        console.log("RESSSSSULTT : ", res);

        setData({
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
          confirmPassword : "",
          securityWord : "",
          exams : {
            "gre": false,
            "toefl": false,
            "ielts": false
          }
        });

        if(res.status === 'success'){
            history.push('/login');
        } 
        
       } catch (err) {
         if (err.response.data.name === "JoiError"){
           Swal.fire({
             icon: 'error',
             title: 'Oops...',
             text: err.response.data.message.msg,
           });
   
           //dynamically setting the state
           setKey(err.response.data.message.error);
           setData({
             [err.response.data.message.error] : "",
           });  
          
          }else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.message,
            });
         }
        }
    console.log("list updated");
  }

  return (
    <>
      <div className="my-3">
        <h2 className="contact_h2 text-center">Register Yourself!</h2>
      </div>
      <div className="container contact">
        <div className="row">
          <div className="col-md-6 col-11 mx-auto">
            <form>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Full Name </label>
                <input type="text" onChange={update} className="form-control myform" id="name" name="name" value={data.name} required placeholder="Enter your name" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" onChange={update} className={"form-control myform "+("email"=== key ? "error":null)} id="email" name="email" value={data.email} required placeholder="Enter your mail" />
              </div>
              <div className="mb-3">"
                <label htmlFor="exampleFormControlInput1" className="form-label">Mobile Number</label>
                <input type="text" onChange={update} className={"form-control myform "+("phoneNumber"=== key ?"error":null)} id="phoneNumber" name="phoneNumber" value={data.phoneNumber} required placeholder="Enter your mobile number" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                <input type="password" onChange={update} className={"form-control myform "+("password"=== key ?"error":null)} id="password" name="password" value={data.password} required placeholder="Enter your password" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Confirm Password</label>
                <input type="password" onChange={update} className={"form-control myform "+("password"=== key ?"error":null)} id="confirmPassword" name="confirmPassword" value={data.confirmPassword} required placeholder="Enter your confirm password" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Security Word</label>
                <input type="password" onChange={update} className="form-control myform " id="securityWord" name="securityWord" value={data.securityWord} required placeholder="Enter your security word" />
              </div>
              <button className="btn btn-outline-primary" onClick={submit_form} >Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;

