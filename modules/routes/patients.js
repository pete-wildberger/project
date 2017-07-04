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



router.post('/', function(req, res) {
    console.log('in patients.js, post to /, req.body is:', req.body);
    patients(req.body).save();
    res.send('saved');
});

router.get('/', function(req, res) {
    console.log('in patients.js, get to /, req.body is:', req.body);
    patients.find().then(function(response) {
        res.send(response);
    });
});
//add appointment
router.put('/:id', function(req, res) {
    console.log('db patient update', req.params.id);
var myQuery = {
    _id: req.params.id
};
var newValues = {
  duration: req.body.duration,
  time: req.body.time,
  date: req.boody.date,
  mType: req.body.mType,
  notes: req.body.notes
};
    patients.update(
     {_id: req.params.id },
     {
        $push: { appointments : newValues }
     }
).then(function(err) {
        if (!err) {
            res.send('nudes');
        } else {
            res.send('error');
        }
    });
});

router.delete('/:id', function(req, res) {
    console.log('db patient delete', req.params.id);
    patients.remove({
        _id: req.params.id
    }).then(function(err) {
        if (!err) {
            res.send('nudes');
        } else {
            res.send('error');
        }
    });
});

module.exports = router;
