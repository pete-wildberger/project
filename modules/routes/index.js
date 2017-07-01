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

router.get('/', function(req, res) {
  console.log('base url hit');
  res.sendFile(path.resolve('public/views/index.html'));
});

router.post('/', function(req, res) {
  console.log('in base url posst hit', req.body);

  user.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) {
      console.log('find user error: ', err);
      res.sendStatus(400);
    } else {
      if (user != undefined) {
        console.log('comparing', req.body.password, ' to ', user.password);

        bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
          if (err) {
            console.log('compare err');
            res.sendStatus(400);
          } else {
            console.log('found it');
            if (isMatch) {
              res.send('hooray');
            } else {
              console.log('bummer');
            }
          }
        });
      } else {
        console.log('no user found');
        res.sendStatus(400);
      }
    }
  });
});


module.exports = router;
