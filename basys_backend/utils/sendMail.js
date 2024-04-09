const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendMail(email, username, password) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: "BASYS_AI", // sender address
    to: email, // list of receivers
    subject: "Invite to join BasysAI", // Subject line
    text: "Hello and Welcome to BasysAI.", // plain text body
    html: `<b>Hello and Welcome to BasysAI. 
    <br> You have been invited to join BasysAI platform.
    <br> Your credentials: <br>
     Username: ${username} <br>
    Password: ${password} <br>
    Login URL: <a href="http://localhost:5173/">http://localhost:5173/</a></b>`, // html body
  });

  console.log("mail is sent", info.messageId);
}

module.exports = { sendMail };
