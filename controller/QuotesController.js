const Quote = require("../models/QuotesModel");
const moment = require('moment')

exports.getQuotes = async () => {
    try{
        const date = moment().format('l');
        console.log("Date : " , date);
        let quote = await Quote.find({Date : date});
        return quote;
    }catch(err){
        console.log("Errrrrrrr : " , err);
        throw err;
    }
}