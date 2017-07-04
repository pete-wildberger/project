var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());


router.get('/', function(req, res) {
    console.log('in appointments.js, get to /, req.body is:', req.body);
    patients.find(
      {
      "appointments":{$exists: true}
    }).then(function(response) {
        res.send(response);
    });
});

router.delete('/:id', function(req, res) {
    console.log('db appointment delete', req.params.id);
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
