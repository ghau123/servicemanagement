const express = require('express')
const bodyParser = require('body-parser')


const cors = require('cors')
const details = require("./json/details.json");
const nodemailer = require("nodemailer");




const PORT = 3000
const api = require('./routes/api')

const app = express()
app.use(cors())
app.use(bodyParser.json())


app.use('/api',api)
app.get('/',function(req,res){
    res.send('hello  from server')
})


app.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, info => {
      console.log(`The mail has beed send  and the id is ` + res.body.name);
      res.send(info);
    });
  });
  
  async function sendMail(user, callback) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: details.email,
        pass: details.password
      }
    });
  
    let mailOptions = {
      from: "gautham.sparkz@gmail.com", // sender address
      to: user.Email, // reciever of user 
      subject: "𝐇𝐀𝐑𝐋𝐄𝐘 𝐃𝐀𝐕𝐈𝐃𝐒𝐎𝐍 𝐒𝐄𝐑𝐕𝐈𝐂𝐄", // Subject line
      html: `<h2>Hi ${user.Name}... </h2>
      <h4>Thanks for joining with us...</h4>
      <p>𝗖𝗮𝗻 𝘆𝗼𝘂 𝗽𝗹𝗲𝗮𝘀𝗲 𝘀𝗵𝗮𝗿𝗲 𝘆𝗼𝘂𝗿 𝗳𝗲𝗲𝗱𝗯𝗮𝗰𝗸 𝗼𝗳 𝘆𝗼𝘂𝗿 𝗯𝗶𝗸𝗲 𝗿𝗶𝗱𝗶𝗻𝗴 𝗲𝘅𝗽𝗲𝗿𝗶𝗲𝗻𝗰𝗲 𝘄𝗶𝘁𝗵 𝘂𝘀...</p>
      `

    };
  
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
  
    callback(info);
  }
  

app.listen(PORT,function(){
    console.log('server running on localhost:'  + PORT)
})
