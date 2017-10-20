//requires
var express = require('express');
var app = express();
var index = require('./routes/index');
var register = require('./routes/register');
var patients = require('./routes/patients');
var profile = require('./routes/profile');
var notes = require('./routes/notes');
var appointments = require('./routes/appointments');

//uses
app.use(express.static('public'));
// if (process.env.NODE_ENV !== 'test') {
//   app.use(logger('dev'));
// }
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

app.use('/', index);
app.use('/register', register);
app.use('/patients', patients);
app.use('/profile', profile);
app.use('/appointments', appointments);
app.use('/notes', notes);

//globals
var port = process.env.PORT || 2017;

//listener
app.listen(port, function() {
  console.log('server up on 2017');
});

module.exports = app;
