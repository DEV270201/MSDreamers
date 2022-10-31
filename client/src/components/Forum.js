import React, { useEffect, useState, useRef, useContext } from "react";
import "../css/Forum.css";
import ForumInput from "../components/ForumInput";
import ForumPost from "../components/ForumPost";
import axios from "axios";
import { SpinnerInfinity } from 'spinners-react';
import Swal from 'sweetalert2';
import { UserContext } from './../context/UserContext';
import { useHistory } from "react-router-dom";

const Forum = () => {

    const [questions, setQuestions] = useState([]);
    const [load, setLoad] = useState(true);
    const [medium, setMedium] = useState(window.innerWidth > 992 ? false : true);
    const left_panel_ref = useRef(null);
    const float_btn_ref = useRef(null);
    const [post, setPost] = useState({
        title: "",
        desc: "",
    });
    const [results,setResults] = useState([]);
    const {status} = useContext(UserContext);
    const history = useHistory();

    //as soon as you load the page, the request will be made to the server for fetching the posts
    useEffect(() => {
        async function fetchData() {
            try {
                const ques = await axios.get("/forum/allquestions");
                setQuestions(ques.data.questions);
                setResults(ques.data.questions);
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

    //for searching the posts
    const search_query = (val) => {
        if(questions.length === 0){
            return;
        }
        const res =  !val ? questions : questions.filter((item,index)=>{
            if((item.title.toLowerCase().includes(val.toLowerCase())) || (item.desc.toLowerCase().includes(val.toLowerCase()))){
                return item;
            }
        });
        console.log("running...");
        setResults(res);
    }

    //filtering the posts
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

    //posting the questions
    const postQuestion = async (event) => {
        event.preventDefault();
        if(!status){
            history.push('/login');
            return;
        }
        try {
            const resp = await axios.post('/forum/addquestion', post);
            if (resp) {
                Swal.fire(
                    {
                        icon: 'success',
                        title: resp.data.message,
                    }
                )
                setResults(resp.data.data);
                window.$('#postModal').modal('hide');
                setPost({
                    title: "",
                    desc: ""
                });
            }
        } catch (err) {
            console.log("Error:", err);
            Swal.fire(
                {
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message,
                }
            )
        }
    }
    //function for expanding the panel
    const toggle_panel = () => {
        left_panel_ref.current.classList.toggle("show_panel");
        float_btn_ref.current.innerHTML = float_btn_ref.current.innerHTML === '+' ? 'x' : '+';
    }

    //for tracking the user input
    const post_inp = (event) => {

        const { name, value } = event.target;
        setPost((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }



    return (
        <>
            {/* post question modal starts here.....*/}

            <div className="modal fade" id="postModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Post your question...</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={postQuestion}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        className="form-control shadow-sm"
                                        id="title"
                                        value={post.title}
                                        name="title"
                                        onChange={post_inp}
                                        placeholder="Enter title"
                                        maxLength="200"
                                        required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="question">Question</label>
                                    <textarea
                                        rows="4"
                                        type="text"
                                        onChange={post_inp}
                                        className="form-control shadow-sm"
                                        value={post.desc} id="desc"
                                        name="desc"
                                        placeholder="Ask a question..."
                                        style={{ resize: "none" }}
                                        maxLength="1000"
                                        required/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#161b22", color: "#fff" }}>Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* post question modal ends here.....*/}

            <br></br>
            <br></br>
            <div className="container-fluid mt-4">
                {/* if the size of the device is medium or smaller than medium, display the button  */}
                <div className="row">
                    {/* left part */}
                    <div className={medium ? "display_none" : "left col-lg-3 pt-2 text-center"} ref={left_panel_ref}>
                        <button type="button" className="btn btn-outline-dark post-btn" data-toggle="modal" data-target="#postModal">POST A QUESTION</button>
                        <button type="button" className="btn btn-light side-button">Tags</button>
                        <button type="button" className="btn btn-light side-button">Users</button>
                        {medium ? null : <img src="https://media3.giphy.com/media/RMfRwI4C1SlbHmRggZ/giphy.gif?cid=ecf05e47uh2t76wd5nd9pkgdqte832bpqnsq6eimryvfes6f&rid=giphy.gif&ct=g" alt="Any Questions???" className="meme" width="100%"></img>}
                    </div>
                    {/* right part */}
                    <div className="right col-lg-9 col-12">
                        <div className="row justify-content-between mt-3">
                            <div className="col-lg-2 col-md-3 col-sm-3 col-12 mt-3 mt-sm-0">
                                <select className="custom-select shadow-sm" onChange={onChangeFilter}>
                                    <option className="select_opt" value="Latest">Latest</option>
                                    <option className="select_opt" value="Most Liked">Most Liked</option>
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
                                    results.length !== 0 ?
                                        results.map((quest, index) => {
                                            return <ForumPost
                                                name={quest.user.name}
                                                profile_pic={quest.user.profile_pic.url}
                                                title={quest.title}
                                                desc={quest.desc}
                                                answers={quest.answers.length}
                                                likes={quest.likes.length}
                                                key={index}
                                                id={quest._id}
                                            />
                                        })
                                        :
                                        <div className="text-center">Ask a question and be a part of this amazing learning community!! </div>
                                }
                            </div>
                        }
                        <div className={medium ? "left_panel" : "display_none"} ref={left_panel_ref}>
                            <button type="button" className="btn btn-outline-dark post-btn" data-toggle="modal" data-target="#postModal" onClick={toggle_panel}>POST A QUESTION</button>
                            <button type="button" className="btn btn-light side-button">Tags</button>
                            <button type="button" className="btn btn-light side-button">Users</button>
                            {medium ? null : <img src="https://media3.giphy.com/media/RMfRwI4C1SlbHmRggZ/giphy.gif?cid=ecf05e47uh2t76wd5nd9pkgdqte832bpqnsq6eimryvfes6f&rid=giphy.gif&ct=g" alt="Profile" className="meme" width="100%"></img>}
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
