var nodemailer = require('nodemailer');

var smtpConfig = {
    service: "Gmail",

    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true, // use SSL
    auth: {
        user: 'rammusasus@gmail.com',
        pass: 'ping#123'
    }
};

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpConfig);

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Rammus Xu" <123@ping.com>', // sender address
    to: 'rammusasus@gmail.com, rammus@ping.com.sg, walter@ping.com.sg', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
