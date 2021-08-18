const express = require("express");
const app = express();

if(process.env.NODE_ENV === "development"){
    console.log("In the development mode");
}

app.use(express.json({ extended : false}));

app.get('/',(_req,res) => res.send('API running!'))

app.use('/register', require('./routes/UserRouter'))



module.exports = app;
