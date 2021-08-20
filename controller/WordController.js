const WordList = require('../models/WordListModel');
const Vocab = require('../models/VocabModel');

exports.getWords = async (req, _res, _next) => {
try{
    let user = req.user;

    const wordsLearnt = user.wordsLearnt; 

    console.log("User : " , user);
    console.log("wordslearnt : " , wordsLearnt);


    const words = await WordList.find({count : {$gt : wordsLearnt , $lt : wordsLearnt + 6}}).limit(5).sort("count");
    // const words = await WordList.find({});
    console.log("words : " , words);

    return words;
    
}catch(err){
    
    console.log("Error : " , err);
    throw err;
}   
}

exports.VocabWords = async (req, res, next) => {
    try {
        const { status, word } = req.body;
        let user_id = req.user.id;

        const newWord = await WordList.findOne({word});
        const word_id = newWord.id;

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