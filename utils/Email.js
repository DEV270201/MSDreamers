let nodemailer = require('nodemailer');

const sendEmail = async (mailID, subject, content)=>{

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
      subject: subject,
      html: content
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
