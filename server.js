
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

// configuration
mongoose.connect(configDB.url); //connects the DB

// require('./config/passport')(passport); // passing passport for configuration

// express app
app.use(morgan('dev')); //log all requests to console
app.use(cookieParser()); // read cookies for auth
app.use(bodyParser()); //get info from html forms

app.set('view engine', 'ejs'); // ejs for templating

// passport
app.use(session({ secret: "AYEwhasDatStank" })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // used for flash messages stored

// routes
require('./app/routes.js')(app, passport); //load routes and pass in app.js & fully configured passport

// launch
app.listen(port);
console.log('Port ' + port + ' is where we get some')






// EXPRESS.JS SERVER
// function handleRequest(request, response) {
//     response.end("Path hit: " + request.url);
// }

// var server = http.createServer(handleRequest);

// server.listen(port, function() {
//     console.log("Server listening on: http://localhost:" + port)
// });