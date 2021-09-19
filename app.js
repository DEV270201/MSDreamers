const express = require("express");
const { NotFoundError, ClientError } = require("./utils/AppErrors");
const app = express();
const cors = require("cors");

if(process.env.NODE_ENV === "development"){
    console.log("In the development mode");
}

if(process.env.NODE_ENV === "production"){
    console.log("in the production stage")
}

app.use(cors({
    origin : "http://localhost:3000"
}));

app.use(express.json({ extended : false}));

app.get('/',(_req,res) => res.send('API running!'));

app.use('/users', require('./routes/UserRouter'));
app.use('/quotes', require('./routes/QuotesRouter'));
app.use('/words', require('./routes/WordsRouter'));
// app.use('/resources',require('./routes/GoogleDriveRouter'));
app.use('/forum', require('./routes/ForumRouter'));
app.use('/test', require('./routes/TestRouter'));

const handleDuplicateError = (error) => {
    const msg = `${Object.keys(error.keyValue)[0]} already exists!`;
    return new ClientError(msg);
}

app.all("*" , (_req,_res,next) =>{
    return next(new NotFoundError("sorry , this route does not exists!"));
});

app.use((err,_req,res,_next) => {
    console.log("global error middleware");
    let error = {...err};
    error.statusCode = err.statusCode || 500;
    error.message = err.message || "Server Error";
    console.log("Error codeee: ", error)
    if(err.code === 11000){
        console.log("ENTERING THE IF STATEMENT");
        error = handleDuplicateError(error);
    }
    res.status(error.statusCode).json({
        status : "Failed",
        message : error.message,
    });
});

module.exports = app;
