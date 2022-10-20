import React,{createContext,useState,useEffect} from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';

export const UserContext = createContext();

const UserContextProvider = (props)=>{

   const getLoginStatus = ()=>{
     let status = window.localStorage.getItem('isLogIn');
     if(status == null){
        window.localStorage.setItem('isLogIn',false);
        return false;
     }
     return status;
   }

   const changeLoginStatus = (val)=>{
    window.localStorage.setItem('isLogin',val);
    setStatus(val);
    return;
   }

   const [status,setStatus] = useState(getLoginStatus);
   const [profile,setProfile] = useState(
    {
        name: "",
        profile_pic : "",
        email: "",
        phoneNumber : "",
        exams:{
            gre: true,
            toefl: false,
            ielts: false
        },
    }
   );
   let history = useHistory();

   useEffect(()=>{
      if(!status){
        console.log("user not logged in...");
        return;
      }else{
        const getProfile = async()=>{
            try{
               let profile = await axios.get();
               console.log("profile : ",profile);
            //    setProfile({
            //     name: profile.name,
            //     email: profile.email,
            //     phoneNumber: profile.phoneNumber,
            //     profile_pic: profile.profile_pic
            //    })
            //setStatus(true);
            }catch(err){
                console.log("error in fetching profile : ",err);
                //if the error is due to missing/invalid token
                changeLoginStatus(false);

                // if(true){
                //    window.localStorage.setItem('isLoggedIn',false);
                //     setStatus(false);
                //    //if the user is not logged in, then redirect the user to login
                //    history.push('/login');
                //    return;
                // }
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! ):'
                  });
            }
            getProfile();
        }
      }
   },[status]);

   return(
    <>
     <UserContext.Provider value={{status,profile,changeLoginStatus}}>
       {
        props.children
       }
     </UserContext.Provider>
    </>
   )
}

export default UserContextProvider;