var mongoose = require( 'mongoose' );

mongoose.connect('mongodb://heroku_b9hrgtrz:9qhebegmqtpu5sgephnn2745on@ds053794.mlab.com:53794/heroku_b9hrgtrz');

var patientSchema = new mongoose.Schema({
    therapist: String,
    firstname: String,
    lastname: String,
    phone: Number,
    email: String,
    appointments: Array
});

var patients = mongoose.model('patients', patientSchema);
module.exports = patients;
