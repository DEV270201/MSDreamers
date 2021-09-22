const express = require('express');
const router = express.Router();
const {google} = require('googleapis');
const fs = require("fs");
const credentials = require('../credentials.json');
const {GoogleDriveUpload} = require("../controller/GoogleDriveController");

/* Steps to upload file on google drive:
Step 1: Create project on https://console.cloud.google.com/
Step 2: Go to your project and create a service account
Step 3: Go to keys and add key. Download the credentials file and add it to the project as credentials.json
Step 4: Add the below code and store the fileId
Step 5: Preview the content by embedding the link https://drive.google.com/file/d/<fileID>/preview  
*/

const scopes = ['https://www.googleapis.com/auth/drive'];

const oauth2Client = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes,
  null
);

router.post('/', async (_req, res) => {
  try{
  const folderId = '1wq1ZDJH2WQ6BK07uT3tusqEOXlaQ2I9n';
  var fileMetadata = {
    name: 'Dogs.jpg', // file name that will be saved in google drive
    parents: [folderId],
  };

  var media = {
    mimeType: 'image/jpg',
    body: fs.createReadStream('utils/dogs.jpg'), // Reading the file from our server
  };

  // Authenticating drive API
  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  // Uploading Single image to drive
  const res = await drive.files.create(
    {
      resource: fileMetadata,
      media: media,
    },
  );
  
  await GoogleDriveUpload(res.data.id);
  
  res.status(201).json({
    status : "success",
    message : "file uploaded successfully!"
  });
}catch(err){
    console.log("errrrr : ", err);
    return next(err);
};
});


// router.get("/", async (req,res,next)=>{
//  drive.files.list({

//  }, (err, res) => {
//   if (err) throw err;
//   const files = res.data.files;
// if (files.length) {
//     files.map((file) => {
// console.log(file);
// });
//   } else {
//      console.log("No files found");
//    }
// });
// });

module.exports = router;
