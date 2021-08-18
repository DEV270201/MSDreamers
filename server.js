const dotenv = require("dotenv");
dotenv.config({path : "./config.env"});
const mongoose = require("mongoose");
const app = require("./app");

const database_connect = async ()=>{
    try{ 
        await mongoose.connect(
            process.env.DATABASE , {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
                useCreateIndex: true,
            }
        )
        console.log("Database connected successfully!");
    }catch(err){
        console.log("Cannot connect to the database!");
    }
}

database_connect();


app.listen(process.env.PORT , ()=>{
    console.log(`serving at Port : ${process.env.PORT}`);
});