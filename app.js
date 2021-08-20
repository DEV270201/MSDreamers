const express = require("express");
const { NotFoundError } = require("./utils/AppErrors");
const app = express();


if(process.env.NODE_ENV === "development"){
    console.log("In the development mode");
}

app.use(express.json({ extended : false}));

app.get('/',(_req,res) => res.send('API running!'));

app.use('/users', require('./routes/UserRouter'));
app.use('/words', require('./routes/WordsRouter'));



app.all("*" , (_req,_res,next) =>{
    return next(new NotFoundError("sorry , this route does not exists!"));
});

app.use((err,_,res) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Server Error";
    res.status(err.statusCode).json({
        status : "Failed",
        message : err.message,
    });
});



module.exports = app;
