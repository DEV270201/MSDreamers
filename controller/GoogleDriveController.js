const Reference = require("../models/ReferenceModel");


exports.GoogleDriveUpload = async(obj)=>{
    try {
        const {image, description, subject, id, name} = obj
        await Reference.create({
            name,
            id,
            subject,
            description,
            image
        });

        return;
    } catch (err) {
        console.log("errrrrr : " , err);
        throw err;
    }
}