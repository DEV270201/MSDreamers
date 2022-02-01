import React from "react";
import "../css/Forum.css";
import ForumInput from "../components/ForumInput";

const Forum = () => {

    const search_query = (val)=>{
        // make get request
       console.log("search : ",val);
    }

    return (
        <>
            <br></br>
            <br></br>
            <div className="container-fluid mt-4">
                <div className="row">
                    {/* left part */}
                    <div className="left col-md-3 pt-2 left-panel" >
                        <center><button type="button" className="btn btn-outline-dark post-btn">POST A QUESTION</button></center>
                        <div className="row">

                        </div>
                    </div>
                    {/* right part */}
                    <div className="right col-md-9">
                        <div className="classify">
                            <select className="custom-select shadow-sm"
                                style={{ width: "150px" }}>
                                <option>Latest</option>
                                <option>Most Liked</option>
                            </select>
                            <ForumInput searchQ={search_query}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Forum;