import React,{useState} from "react";
import "../css/Profile.css";
import axios from 'axios';

const Profile = ()=>{

  // const[search,setSearch] = useState("");
  const[img,setImg] = useState("");
  const[imageData,setimageData] = useState({url: "", public_id: ""});
  
  // const update = (e)=>{
  //    setSearch(e.target.value);
  // }

  const updateImage = (e)=>{
      console.log("image : ",e.target.files[0]);
      setImg(e.target.files[0]);
  }

  const uploadDetails = async (e) => {
    //uploading the profile image on cloudinary
    
    e.preventDefault();
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset",process.env.REACT_APP_PRESET_NAME);
    data.append("cloud_name",process.env.REACT_APP_CLOUD_NAME );
    data.append("folder","Profile pictures");
    try{
      const resp = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,data);
      setimageData({url: resp.data.url, public_id: resp.data.public_id});
    }catch(err){
      console.log("errr : ",err);
    }
  }

  return(
  <>
   <form>
     <br></br>
     <br></br>
     <br></br>
            <input type="file" onChange={updateImage} className="form-control shadow-sm" id="profile_pic" name="profile_pic" accept="image/*"/>
            <button onClick={uploadDetails}>Upload</button>
    </form>
  </>
  );
}

export default Profile;