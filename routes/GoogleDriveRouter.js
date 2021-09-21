const express = require("express");
const router = express.Router();
const {google} = require('googleapis');
const fs = require("fs");
const credentials = require('../credentials.json')

const scopes = [
  'https://www.googleapis.com/auth/drive',
];

const oauth2Client = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes
);



router.post('/', async(req,res) => {

      var fileMetadata = {
        name: "Sunrise123", // file name that will be saved in google drive
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