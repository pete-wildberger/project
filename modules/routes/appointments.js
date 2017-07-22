var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var patients = require('../patients');
var config = require('../config');
var nodemailer = require('nodemailer');
var twilio = require('twilio');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.username, //YOUR GMAIL USER HERE -> EXAMPLE@gmail.com
        pass: config.mailPassword  //YOUR GMAIL PASSWORD, DO NOT HOST THIS INFO ON GITHUB!
    }
});

var client = twilio(config.accountSid, config.authToken);
// var tmClient = new TMClient('USERNAME', 'API KEY');




router.post('/email', function(req,res){
    var mailer = req.body;
    console.log(mailer);

    var mailOptions = {
//example: from: '"Scott" scott@primeacademy.io',
        from: '"'+ mailer.from +'" ' + config.username + '', // sender address -> //YOUR GMAIL USER HERE IN STRING + email not in string! -> EXAMPLE@gmail.com
        to: mailer.toEmail, // list of receivers
        subject: 'Appointment Reminder', // Subject line
        text: 'Your next appointment is on ' +  mailer.date + ' at '+ mailer.time +'.  We can wait to see you then!', // plain text body
        html: '<b>' + 'Your next appointment is on ' +  mailer.date + ' at '+ mailer.time +'.  We can\'t wait to see you then!' + '</b>' // html body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });

    res.send(200);
});

router.post('/text', function(req, res) {
  console.log("req body: ", req.body);
  client.messages.create({
    to: req.body.toNumber,
    from: config.numberSRC,
    body: 'Your next appointment is on ' +  req.body.date[0] + ' at '+ req.body.time +'.  We can wait to see you then!', // plain text body,
  }, function(err, message) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(message.sid);
      res.sendStatus(200);
    }
  });
});






router.delete('/:id', function(req, res) {
  console.log('db appointment delete', req.params.id);

  console.log("-----------------");
  var newValues = {
    $pull: { appointments: { id: req.params.id}
  }
 };
  console.log('new notes: ', newValues);
  patients.update({ }, newValues, { multi: true }, function(err) {
    console.log('Did we make it in?');
    if (!err) {
      res.send('safe');
    } else {
      console.log(err);
      res.send('error');
    }
  });
});
module.exports = router;
