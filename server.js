//requires
var express= require('express');
var app = express();
var index = require('./modules/routes/index');
var register = require('./modules/routes/register');
var patients = require('./modules/routes/patients');
var profile = require('./modules/routes/profile');

//uses
app.use(express.static ('public'));


app.use('/', index);
app.use('/register', register);
app.use('/patients', patients);
app.use('/profile', profile);

//globals
var port = process.env.PORT || 2017;

//listener
app.listen(port, function(){
  console.log('server up on 2017');
});
