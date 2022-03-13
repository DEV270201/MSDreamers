import React from "react";
import "../css/ForumPost.css";
import Message from "../Icons/Message";
import Thumbs from "../Icons/Thumbs";

const ForumPost = () => {

    const desc = "We have lots of options available when it comes to education institute but this should not be limited to a institute we should also look for the facilities one should required to have a bright future.We have lots of options available when it comes to education institute but this should not be limited to a institute we should also look for the facilities one should required to have a bright future. We have lots of options available when it comes to education institute but this should not be limited to a institute we should also look for the facilities one should required to have a bright future."

    return (
        <>
            <div className="forum_cont mt-2">
                <div className="row">
                    <div className="col-md-10 p_left">
                        <div className="pst_info">
                            <img className="img-fluid owner_img" src="https://www.sugandhabazar.com/wp-content/uploads/2020/01/profile-icon-png-9.png" alt="profile" />
                            <p className="owner_name ml-2 mt-3">Hello ABC</p>
                        </div>
                        <h4 className="pl-3 mt-1">Which are the best degree colleges in Mumbai?</h4>
                        <div className="pst_desc pl-3">
                            <p>
                                {
                                    desc.length >= 200 ? desc.slice(0, 200) + "......" : desc
                                }
                            </p>
                        </div>
                    </div>
                    <div className="col-md-2 p_right">
                         1
                      <Message />
                      1
                      <Thumbs />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForumPost;
