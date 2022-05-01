const WordList = require('../models/WordListModel');
const Vocab = require('../models/VocabModel');
const Dictionary = require('../models/DictionaryModel');

exports.getWords = async (req, _res, _next) => {
try{
    let user = req.user;

    const wordsLearnt = user.wordsLearnt; 

    const words = await WordList.find({count : {$gt : wordsLearnt , $lt : wordsLearnt + 6}}).sort("count");
    // const words = await WordList.find({});
    console.log("words : " , words);

    return words;
    
}catch(err){
    
    console.log("Error : " , err);
    throw err;
}   
}

exports.VocabWords = async (req, _res, _next) => {
    try {
        const { status, id } = req.body;
        let user_id = req.user.id;
        let word_id = id;

        await Vocab.create({
            user : user_id,
            word : word_id,
            status
        });

        return;

    } catch (err) {
        console.log(err);
        throw err;
    }
}

exports.AddToDictionary = async(req)=>{
    try{
        const user = req.user;
        const {word,sentence,type,meaning} = req.body;
        await Dictionary.create({
            user: user.id,
            word,
            sentence,
            type,
            meaning
        });

        return;

    }catch(err){
        console.log(err);
        throw err;
    }
}

exports.GetFromDictionary = async (req) => {
    try {
        const user = req.user.id;
        const words = await Dictionary.find({user},{user : 0});
        return words;
        
    } catch (err) {
        console.log(err);
        throw err;
    }
}

exports.GetUserWords = async(req)=>{
    try {
        const user = req.user.id;
        const words = await Vocab.find({user},{user:0}).populate("word");
        return words;
        
    } catch (err) {
        console.log(err);
        throw err;
    }
}