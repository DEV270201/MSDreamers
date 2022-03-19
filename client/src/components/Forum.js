import React, { useEffect, useState, useRef } from "react";
import "../css/Forum.css";
import ForumInput from "../components/ForumInput";
import ForumPost from "../components/ForumPost";
import axios from "axios";
import { SpinnerInfinity } from 'spinners-react';

const Forum = () => {

    const [questions, setQuestions] = useState([]);
    const [load, setLoad] = useState(true);
    const [medium, setMedium] = useState(window.innerWidth > 992 ? false : true);
    const left_panel_ref = useRef(null);
    const float_btn_ref = useRef(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const ques = await axios.get("/forum/allquestions");
                setQuestions(ques.data.questions);
                setLoad(false);
            } catch (err) {
                setLoad(false);
                console.log("Error:", err)
            }
        }
        fetchData();

        //checking if the user changes the size of the device
        function change_size() {
            if (window.innerWidth > 992) {
                setMedium(false);
            } else {
                setMedium(true);
            }
        }

        window.addEventListener("resize", change_size);

        return (() => {
            window.removeEventListener("resize", change_size);
        });

    }, []);

    const search_query = (val) => {
        // make get request
        console.log("search : ", val);
    }

    const onChangeFilter = async (event) => {
        setLoad(true);
        if (event.target.value === "Latest") {
            const ques = await axios.get("/forum/allquestions");
            setQuestions(ques.data.questions);
        } else {
            const ques = await axios.get("/forum/mostlikedquestions")
            setQuestions(ques.data.questions);
        }
        setLoad(false);
    }


    //function for expanding the panel
    const toggle_panel = () => {
        left_panel_ref.current.classList.toggle("show_panel");
        float_btn_ref.current.innerHTML = float_btn_ref.current.innerHTML === '+' ? 'x' : '+';
    }

    return (
        <>
            <br></br>
            <br></br>
            <div className="container-fluid mt-4">
                {/* if the size of the device is medium or smaller than medium, display the button  */}
                <div className="row">
                    {/* left part */}
                    <div className={medium ? "display_none" : "left col-lg-3 pt-2 text-center"} ref={left_panel_ref}>
                        <button type="button" className="btn btn-outline-dark post-btn">POST A QUESTION</button>
                        <button type="button" className="btn btn-light side-button">Tags</button>
                        <button type="button" className="btn btn-light side-button">Users</button>
                        {medium ? null : <img src="https://media3.giphy.com/media/RMfRwI4C1SlbHmRggZ/giphy.gif?cid=ecf05e47uh2t76wd5nd9pkgdqte832bpqnsq6eimryvfes6f&rid=giphy.gif&ct=g" className="meme" width="100%"></img>}
                    </div>
                    {/* right part */}
                    <div className="right col-lg-9 col-12">
                        <div className="row justify-content-between">
                                <div className="col-lg-2 col-md-3 col-sm-3 col-12 mt-3 mt-sm-0">
                                    <select className="custom-select shadow-sm" onChange={onChangeFilter}>
                                        <option value="Latest">Latest</option>
                                        <option value="Most Liked">Most Liked</option>
                                    </select>
                                </div>
                                <div className="col-lg-6 col-md-7 col-sm-6 col-12 mt-sm-0 mt-2">
                                    <ForumInput searchQ={search_query} />
                                </div>
                        </div>
                        {load ?
                            <>
                                <div className="register_load">
                                    <div className="loader">
                                        {/* <div> */}
                                        <SpinnerInfinity
                                            size={75}
                                            thickness={150}
                                            color="#161b22" />
                                        <h6 className="register_load_h6">This may take a moment....</h6>
                                    </div>
                                </div>
                            </>
                            :
                            <div className="mt-3">
                                {
                                    questions.length !== 0 ?
                                        questions.map((quest, index) => {
                                            return <ForumPost
                                                name={quest.user.name}
                                                title={quest.title}
                                                desc={quest.desc}
                                                answers={quest.answers.length}
                                                likes={quest.likes.length}
                                                key={index}
                                            />
                                        })
                                        :
                                        <div className="text-center">Ask a question and be a part of this amazing learning community!! </div>
                                }
                            </div>
                        }
                        <div className={medium ? "left_panel" : "display_none"} ref={left_panel_ref}>
                        <button type="button" className="btn btn-outline-dark post-btn">POST A QUESTION</button>
                        <button type="button" className="btn btn-light side-button">Tags</button>
                        <button type="button" className="btn btn-light side-button">Users</button>
                        {medium ? null : <img src="https://media3.giphy.com/media/RMfRwI4C1SlbHmRggZ/giphy.gif?cid=ecf05e47uh2t76wd5nd9pkgdqte832bpqnsq6eimryvfes6f&rid=giphy.gif&ct=g" className="meme" width="100%"></img>}
                    </div>
                        {
                    medium ? <button className="floating_btn" onClick={toggle_panel} ref={float_btn_ref}>+</button> : null}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Forum;