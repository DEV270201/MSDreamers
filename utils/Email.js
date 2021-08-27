let nodemailer = require('nodemailer');

const sendEmail = async (token,mailID)=>{

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD
      }
    });

    let mailOptions = {
      from: process.env.GMAIL,
      to: mailID,
      subject: 'Verification Email!!',
      html: `
      <h2>Please verify you email account in order to access the services.</h2>
      <br>
      <p>Click on this <a href="http://localhost:3000/verifyAccount/${token}">link</a> to verify:</p>
      <h5 muted>This link shall expire in 1 hour.</h5>`
    };
    
    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
