var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var SpotifyWebApi = require('spotify-web-api-node');
var session = require('express-session'),
	passport = require('passport'),
	SpotifyStrategy = require('passport-spotify').Strategy;

/**
 * Set the credentials given on Spotify's My Applications page.
 * https://developer.spotify.com/my-applications
 */
// var client_id = '2421a4b55e5c457eb279cacbacb9d318'; // Your client id
// var client_secret = '97d2682f52c44db6ab68a812d72e59c0'; // Your secret
// var redirect_uri = 'http://localhost:3000/users/callback'; // Your redirect uri
// spotifyApi = new SpotifyWebApi({
// 	clientId : client_id,
// 	clientSecret : client_secret,
// 	redirectUri : redirect_uri
// });

// Get models.
var mongoose = require('mongoose'); //add for Mongo support
mongoose.connect('mongodb://amccannv:basementhacks2017@ds227565.mlab.com:27565/auxdatabase'); //connect to Mongo database
require('./models/playlist');

// Generate variables for routes
var index = require('./routes/index');
var users = require('./routes/users');
var playlists = require('./routes/playlists');

var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat' }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

// Redirect routes to the controllers.
app.use('/', express.static('public'));
app.use('/users', users);
app.use('/playlists', playlists);
app.use('*', index);
//app.use(express.static('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// general error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
