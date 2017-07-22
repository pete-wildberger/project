var mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://heroku_b9hrgtrz:9qhebegmqtpu5sgephnn2745on@ds053794.mlab.com:53794/heroku_b9hrgtrz' );
var userSchema = new mongoose.Schema({
  username: String,
  password: String
});

var userModel = mongoose.model( 'userModel', userSchema );

module.exports = userModel;
