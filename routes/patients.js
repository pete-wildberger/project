var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var patients = require('../modules/patients.js');

router.use(
  bodyParser.urlencoded({
    extended: true
  })
);
router.use(bodyParser.json());

router.post('/', function(req, res) {
  console.log('in patients.js, post to /, req.body is:', req.body);
  patients(req.body)
    .save()
    .then(function(err) {
      if (!err) {
        res.send('nudes');
      } else {
        res.send('error');
      }
    });
});

router.get('/:id', function(req, res) {
  console.log('in profile.js, get to /, req.params.id is:', req.params.id);
  patients
    .find({
      therapist: req.params.id
    })
    .then(function(response) {
      console.log(response);
      res.send(response);
    });
});
//add appointment

router.put('/:id', function(req, res) {
  console.log('db patient update', req.params.id);
  var myQuery = {
    _id: req.params.id
  };
  console.log(myQuery);
  console.log(req.body.id);
  var newValues = {
    $push: {
      appointments: {
        id: req.body.id,
        duration: req.body.duration,
        time: req.body.time,
        date: req.body.date,
        mType: req.body.mType,
        notes: req.body.notes
      }
    }
  };
  console.log('new: ', newValues);
  patients.findOneAndUpdate(myQuery, newValues, function(err) {
    if (!err) {
      res.send('nudes');
    } else {
      res.send('error');
    }
  });
});

router.delete('/:id', function(req, res) {
  console.log('db patient delete', req.params.id);
  patients
    .remove({
      _id: req.params.id
    })
    .then(function(err) {
      if (!err) {
        res.send('nudes');
      } else {
        res.send('error');
      }
    });
});

module.exports = router;
