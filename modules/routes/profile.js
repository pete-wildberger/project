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



router.get('/:id', function(req, res) {
  console.log('in profile.js, get to /, req.params.id is:', req.params.id);
  console.log('req.query', req.query);
  patients.find({
      _id: req.params.id
  }).then(function( response) {
    console.log(response);
    res.send(response);
  });
});

module.exports = router;
