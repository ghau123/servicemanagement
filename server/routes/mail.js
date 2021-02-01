var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: '',
  auth: {
    user: 'gautham.sparkz@gmail.com',
    pass: '8883980089'
  }
});

var mailOptions = {
  from: 'gautham.sparkz@gmail.com',
  to: 'gautham.sparkz@gmail.com',
  subject: 'service',
  text:`hello`
    
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});