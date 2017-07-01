//requires
var express= require('express');
var app = express();
var index = require('./modules/routes/index');

var register = require('./modules/routes/register');


//uses
app.use(express.static ('public'));


app.use('/', index);

app.use('/register', register);
//globals
var port = process.env.PORT || 2017;

//listener
app.listen(port, function(){
  console.log('server up on 2017');
});
