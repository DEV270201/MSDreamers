const express = require("express");
const router = express.Router();
const {google} = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "http://localhost:4000"
);

const scopes = [
  'https://www.googleapis.com/auth/drive',
];

router.post('/', async(req,res) => {
    // await resourceController();
    const url = oauth2Client.generateAuthUrl({
        access_type : "offline",
        scope: scopes
      });
    
      console.log("urrrrllllllllllllll : " , url);
      
      const {tokens} = await oauth2Client.getToken("4%2F0AX4XfWivjx92QAM6fZmE52R5ycZdnLU9HFoq3jkdLAXgyNnbHJBeziUKrVO5KHAT8OHanQ");
      console.log("Toooooooookeeeeeeeeeensnnnnn : " , tokens);

      oauth2Client.setCredentials(tokens);

      var fileMetadata = {
        name: "Sunrise", // file name that will be saved in google drive
      };
    
      var media = {
        mimeType: 'image/webp',
        body: fs.createReadStream('../utils/pic.webp'), // Reading the file from our server
      };
    
      // Authenticating drive API
      const drive = google.drive({ version: 'v3', oauth2Client });
    
      // Uploading Single image to drive
      drive.files.create(
        {
          resource: fileMetadata,
          media: media,
        },
        async (err, file) => {
          if (err) {
            // Handle error
            console.error("errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr" , err.msg);
    
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