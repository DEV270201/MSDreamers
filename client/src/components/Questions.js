import React, { useEffect, useState } from "react";
import axios from "axios";

const Questions = (props) => {

    const [QuestionDetails, setQuestionDetails] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const ques = await axios.get(`/forum/question/`+props.match.params.question_id);
                setQuestionDetails(ques.data.data);
            } catch (err) {
                console.log("Error:", err)
            }
        }
        fetchData();

    }, []);

    return (
        <>
        <br></br>
        <br></br>
        <br></br>
        <div className="row">
            <div className="col-md-6">
                {QuestionDetails.title}
            </div>
            <div className="col-md-6">
                {QuestionDetails.title}
            </div>
        </div>
        </>
    )
}

export default Questions;