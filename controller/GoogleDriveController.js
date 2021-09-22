const Reference = require("../models/ReferenceModel");


exports.GoogleDriveUpload = async(fileDetails)=>{
    try {
        await Reference.create({
            // name : 
        })
    } catch (err) {
        console.log("errrrrr : " , err);
        throw err;
    }
}