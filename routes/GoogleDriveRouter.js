const express = require("express");
const router = express.Router();
const {google} = require('googleapis');
const fs = require("fs");

const scopes = [
  'https://www.googleapis.com/auth/drive',
];

const oauth2Client = new google.auth.JWT(
  // process.env.CLIENT_ID,
  // process.env.CLIENT_SECRET,
  // "http://localhost:4000"
  "devanshpriyal@gmail.com",
  process.env.JWT_PRIVATE_KEY.replace(/\\n/gm, '\n'),
  // process.env.JWT_PRIVATE_KEY,
  scopes
);



router.post('/', async(req,res) => {
  console.log("KKKKKKKKEYYYYYYYYYYYYYYY : ", process.env.JWT_PRIVATE_KEY);
    // await resourceController();
    // const url = oauth2Client.generateAuthUrl({
    //     access_type : "offline",
    //     scope: scopes
    //   });
    
    //   console.log("urrrrllllllllllllll : " , url);
      
      // const {tokens} = await oauth2Client.getToken("");
      // console.log("Toooooooookeeeeeeeeeensnnnnn : " , tokens);

      // oauth2Client.setCredentials({
      //   access_token: "ya29.a0ARrdaM-1Klh2zYMsZIG5iwK0t3zY86K6ZeMzfiGfZsTZBTVYHuZuSvqoNrnBDWD6DaJGzbD8-L0TOnZvaNJWiiz6uTPMecpGVlqOVhzJs2_lGaXODPHz5ICTBcu8cNpfqMwWIczX9YQ36h8-kETVUXjks8Lz"
      // });

      var fileMetadata = {
        name: "Sunriseeeee", // file name that will be saved in google drive
      };
    
      var media = {
        mimeType: 'image/webp',
        body: fs.createReadStream('utils/pic.webp'), // Reading the file from our server
      };
    
      // Authenticating drive API
      const drive = google.drive({ version: 'v3', auth: oauth2Client });
    
      // Uploading Single image to drive
      drive.files.create(
        {
          resource: fileMetadata,
          media: media,
        },
        async (err, file) => {
          if (err) {
            // Handle error
            console.error("errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr" , err);
    
            return res
              .status(400)
              .json({ errors: [{ msg: 'Server Error try again later' }] });
          } else {
            // if file upload success then return the unique google drive id
            res.status(200).json({
              status : "success",
              fileID: file.data.id,
            });
          }
        }
      );
});

module.exports = router;