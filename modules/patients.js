var mongoose = require( 'mongoose' );

mongoose.connect('localhost:27017/stroked');

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
