var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var patients = require('../patients');


router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());



router.put('/:id', function(req, res) {
  console.log('db notes update', req.body);
  var myQuery = {
    '_id': req.params.id,
    'appointments.id': req.body.arrID
  };
  //
  console.log('query, ', myQuery);

  console.log("-----------------", req.body);
  var newValues = {
    $set: {
      'appointments.$.notes': {
        noteId: req.body.appointment.noteId,
        s: req.body.appointment.s,
        o: req.body.appointment.o,
        a: req.body.appointment.a,
        p: req.body.appointment.p,
        spots: req.body.appointment.spots

      }
    }
  };
  console.log('new notes: ', newValues);
  patients.findOneAndUpdate(myQuery, newValues, function(err) {
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
