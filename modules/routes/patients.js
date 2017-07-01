var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

mongoose.connect('localhost:27017/stroked');

var patientSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    phone: Number,
    email: String
});

var patients = mongoose.model('patients', patientSchema);

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
