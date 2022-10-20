import React, { useState, useEffect } from "react";
import "../css/Profile.css";
import axios from 'axios';
import cloudinary from "cloudinary/lib/cloudinary";
import Swal from 'sweetalert2';

// Used credentials for deleting the image
cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUD_NAME,
  api_key: process.env.REACT_APP_API_KEY,
  api_secret: process.env.REACT_APP_API_SECRET
});

const Profile = () => {

  // const[search,setSearch] = useState("");
  const [img, setImg] = useState("");
  const [imageData, setimageData] = useState({ url: "", public_id: "" });
  const [data, setData] = useState({name: "",email:"",phoneNumber:""})

  useEffect(()=>{
    async function fetchDetails(){
      try{
       let resp = await axios.get("");
       console.log("resp : ",resp);
      }catch(err){
         console.log("err : ",err);
      }
    }
    fetchDetails();
  },[]);

  const updateImage = (e) => {
    console.log("image : ", e.target.files[0]);
    setImg(e.target.files[0]);
  }

  const uploadDetails = async (e) => {
    // Uploading the profile image on cloudinary
    console.log("triggered.......");
    e.preventDefault();
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", process.env.REACT_APP_PRESET_NAME);
    data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
    data.append("folder", "Profile pictures");
    try {
      // Uploaded to cloudinary cloud
      const resp = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, data);

      // After successfully updating the cloud, update the database

      setimageData({ url: resp.data.url, public_id: resp.data.public_id });
    } catch (err) {
      console.log("errr : ", err);
    }
  }

  // API SECRET is used to generate the signature
  // API KEY is used to delete the photos from cloudinary

  // Function to remove the image from cloudinary
  const removeProfilePicture = async (e) => {
    e.preventDefault();
    cloudinary.v2.uploader.destroy(imageData.public_id, function (error, result) {
      console.log(result, error)
    })
      .then(resp =>
        Swal.fire(
          {
            text: "Profile picture removed successfully!",
            icon: 'success'
          }
        ))
      .catch(_err => console.log("Something went wrong, please try again later."));
  }

  const update = (event) => {
    const { name, value } = event.target;

    setData((data) => {
      return {
        ...data,
        [name]: value
      };
    });
  }

  return (
    <>
      <div>
      <input type="file" onChange={updateImage} className="form-control shadow-sm" id="profile_pic" name="profile_pic" accept="image/*" />
      <button onClick={uploadDetails}>Upload</button>
      <button onClick={removeProfilePicture}>Remove</button>
      </div>
      <div className="container contact">
        <div className="row">
          <div className="col-md-6 col-11 mx-auto">
            <form >
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Full Name: </label>
                <input type="text" onChange={update} className="form-control myform" id="name" name="name" value={data.name} required placeholder="Enter your name" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Email address:</label>
                {/* <input type="email" onChange={update} className={"form-control myform " + ("email" === key ? "error" : null)} id="email" name="email" value={data.email} required placeholder="Enter your email id" /> */}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Mobile Number:</label>
                {/* <input type="text" onChange={update} className={"form-control myform " + ("phoneNumber" === key ? "error" : null)} id="phoneNumber" name="phoneNumber" value={data.phoneNumber} required placeholder="Enter your mobile number" /> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;