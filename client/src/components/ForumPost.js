import React from "react";
import "../css/ForumPost.css";
import Message from "../Icons/Message";
import Thumbs from "../Icons/Thumbs";
import Questions from "./Questions";
import { NavLink } from 'react-router-dom';

const ForumPost = (props) => {

    // const desc = "We have lots of options available when it comes to education institute but this should not be limited to a institute we should also look for the facilities one should required to have a bright future.We have lots of options available when it comes to education institute but this should not be limited to a institute we should also look for the facilities one should required to have a bright future. We have lots of options available when it comes to education institute but this should not be limited to a institute we should also look for the facilities one should required to have a bright future."

    return (
        <>
            <div className="forum_cont mt-2">
                <NavLink className="text-decoration-none text-dark" to="/forum/">
                <div className="row">
                    <div className="col-md-10 p_left">
                        <div className="pst_info">
                            <img className="img-fluid owner_img" src={props.profile_pic} alt="profile" />
                            <p className="owner_name ml-2 mt-3">{props.name}</p>
                        </div>
                        <h4 className="pl-3 mt-1">{props.title}</h4>
                        <div className="pst_desc pl-3">
                            <p>
                                {
                                    props.desc.length >= 100 ? props.desc.slice(0, 100) + "......" : props.desc
                                }
                            </p>
                        </div>
                    </div>
                    <div className="col-md-2 p_right">
                         {props.answers}
                      <Message />
                      {props.likes}
                      <Thumbs />
                    </div>
                </div>
                </NavLink>
            </div>
        </>
    )
}

export default ForumPost;
