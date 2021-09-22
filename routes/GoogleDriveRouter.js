const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const fs = require('fs');
const credentials = require('../credentials.json');

const scopes = ['https://www.googleapis.com/auth/drive'];

const oauth2Client = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes,
  null
);

router.post('/', async (_req, res) => {
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
  await drive.files.create(
    {
      resource: fileMetadata,
      media: media,
    },
    async (err, file) => {
      if (err) {
        // Handle error
        console.error('errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', err);

        return res
          .status(400)
          .json({ errors: [{ msg: 'Server Error try again later' }] });
      } else {
        // if file upload success then return the unique google drive id
        console.log(file);
        res.status(200).json({
          status: 'success',
          fileID: file.data.id,
        });
      }
    }
  );
});

module.exports = router;
