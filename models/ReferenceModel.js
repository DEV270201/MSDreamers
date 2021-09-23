const mongoose = require("mongoose");

const ReferenceSchema = new mongoose.Schema({
    id : {
        type : String,
    },
    image : {
        type : String,
    },
    description : {
        type : String,
    },
    name : {
        type : String
    },
    createdAt : {
        type : Date,
        default: Date.now
    },
    subject : {
        type : String
    }
}
);

const Reference = mongoose.model("Reference", ReferenceSchema);

module.exports = Reference;