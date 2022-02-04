import React,{useState} from "react";
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

const Profile = ()=>{

  // const[search,setSearch] = useState("");
  const[img,setImg] = useState("");
  const[imageData,setimageData] = useState({url: "", public_id: ""});

  const updateImage = (e)=>{
      console.log("image : ",e.target.files[0]);
      setImg(e.target.files[0]);
  }

  const uploadDetails = async (e) => {
    // Uploading the profile image on cloudinary
    console.log("triggered.......");
    e.preventDefault();
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset",process.env.REACT_APP_PRESET_NAME);
    data.append("cloud_name",process.env.REACT_APP_CLOUD_NAME );
    data.append("folder","Profile pictures");
    try{
      // Uploaded to cloudinary cloud
      const resp = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,data);
      
      // After successfully updating the cloud, update the database
  
      setimageData({url: resp.data.url, public_id: resp.data.public_id});
    }catch(err){
      console.log("errr : ",err);
    }
  }

// API SECRET is used to generate the signature
// API KEY is used to delete the photos from cloudinary

// Function to remove the image from cloudinary
  const removeProfilePicture = async (e) => {
    e.preventDefault();
      cloudinary.v2.uploader.destroy(imageData.public_id, function(error,result) {
        console.log(result, error) })
        .then(resp => 
          
          Swal.fire(
          {
          text: "Profile picture removed successfully!",
          icon: 'success'}
        ))
        .catch(_err=> console.log("Something went wrong, please try again later."));
  }

  return(
  <>
   <form>
     <br></br>
     <br></br>
     <br></br>
            <input type="file" onChange={updateImage} className="form-control shadow-sm" id="profile_pic" name="profile_pic" accept="image/*"/>
            <button onClick={uploadDetails}>Upload</button>
            <button onClick={removeProfilePicture}>Remove</button>
    </form>
  </>
  );
}

export default Profile;