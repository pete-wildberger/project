var express = require('express');
var router = express.Router();
var path = require('path');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var user = require('../user');

router.use(bodyParser.urlencoded({
  extend: true
}));
router.use(bodyParser.json());

router.post('/', function(req, res) {
  console.log('register posst hit', req.body);
  //use bcrypt to generate a salt
  bcrypt.genSalt(12, function(err, salt) {
    console.log('salt:', salt);
    if (err) {
      console.log('salt err');
      res.sendStatus(400);
    } else {
      console.log('slat');
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        if (err) {
          console.log('hash err');
          res.sendStatus(400);
        } else {
          console.log('hash: ', hash);
          var newUser = {
            username: req.body.username,
            password: hash
          };
          console.log('saving user', newUser);
          //save newUser to db
          user(newUser).save();
          res.sendStatus(201);
        }
      });
    }
  });
});


module.exports = router;
