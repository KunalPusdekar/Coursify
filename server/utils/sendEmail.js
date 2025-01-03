import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();


// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async function (email, subject, message) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure:true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL, // sender address
    to: email, // user email
    subject: subject, // Subject line
    html: message, // html body
  });

// try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent: ', info.response);
//   } catch (error) {
//     console.error('Error sending email: ', error);
//     throw new Error(`Failed to send email: ${error.message}`);
//   }
 };

 export default sendEmail;

