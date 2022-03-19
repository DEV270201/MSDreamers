import React,{useState} from "react";
import "../css/ForumInput.css";

const ForumInput = ({searchQ})=>{

  const[search,setSearch] = useState("");
  
  const update = (e)=>{
     setSearch(e.target.value);
  }

  const searchFunc = (e)=>{
    e.preventDefault();
    searchQ(search);
    setSearch("");
  }

  return(
  <>
   <form onSubmit={searchFunc}>
            <input type="text" onChange={update} className="form-control mysearch shadow-sm" id="search" name="search" value={search} required placeholder="Search Your Query" />
    </form>
  </>
  );
}

export default ForumInput;