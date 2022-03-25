import React,{useState,useEffect} from "react";
import "../css/ForumInput.css";

const ForumInput = ({searchQ})=>{

  const[search,setSearch] = useState("");

  useEffect(()=>{
     searchQ(search);
  },[search]);
  
  const update = (e)=>{
     setSearch(e.target.value);
  }

  // const searchFunc = (e)=>{
  //   e.preventDefault();
  //   searchQ(search);
  //   setSearch("");
  // }

  return(
  <>
   <form>
            <input 
            type="text" 
            onChange={update} 
            className="form-control mysearch shadow-sm" 
            id="search" 
            name="search" 
            value={search} 
            required 
            placeholder="Search Your Query" />
    </form>
  </>
  );
}

export default ForumInput;