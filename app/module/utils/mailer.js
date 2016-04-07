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
var smtpConfig2 = {
    host: 'smtp.office365.com',
    port: 25,
    // port: 587,
    // host: 'ping-com-sg.mail.protection.outlook.com',
    // port: 25,
    auth: {
        // user: 'hello@ping.com.sg',
        // pass: 'Jufu7654'
        user: 'rammus@ping.com.sg',
        pass: 'ping#123'
    },
    secureConnection: 'false',
    tls: { ciphers: 'SSLv3' }
};

// create reusable transporter object using the default SMTP transport
// var transporter = nodemailer.createTransport(smtpConfig);
var transporter = nodemailer.createTransport(smtpConfig2);

// send mail with defined transport object
exports.send = function send(username, cb) {

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"Rammus Xu" <rammus@ping.com.sg>', // sender address
        to: 'rammus@ping.com.sg', // list of receivers
        // to: 'randy@ping.com.sg,rammus@ping.com.sg, walter@ping.com.sg', // list of receivers
        subject: 'Ping: Create user', // Subject line
        // text: 'Ping: Create user', // plaintext body
        html: `<b>Hello ${username} 🐴</b>` // html body
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
        	cb(error);
            return console.log(error);
        }
        cb(null, info.response);
    });
}
