var express = require('express');
var unirest = require('unirest');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var bcrypt = require('bcryptjs');
var flash = require('connect-flash');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var configDB = require('./config/database.js');
var models = require('./app/models/user-model');

mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.use(express.static('public'));    // show index.html

app.use(cookieParser());
app.use(bodyParser());
app.set('view engine', 'ejs'); 
app.use(session({ secret: 'ceiling cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport, unirest);

exports.app = app;

app.listen(process.env.PORT || 8080, function() {
    console.log('Server started at http://localhost:8080');
});
