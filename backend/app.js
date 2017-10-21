var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var SpotifyWebApi = require('spotify-web-api-node');

/**
 * Set the credentials given on Spotify's My Applications page.
 * https://developer.spotify.com/my-applications
 */
var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret
var redirect_uri = process.env.REDIRECT_URI; // Your redirect uri
spotifyApi = new SpotifyWebApi({
	clientId : '2421a4b55e5c457eb279cacbacb9d318',
	clientSecret : '97d2682f52c44db6ab68a812d72e59c0',
	redirectUri : 'http://localhost:3000/users/callback'
});

// Get models.
var mongoose = require('mongoose'); //add for Mongo support
mongoose.connect('mongodb://amccannv:basementhacks2017@ds227565.mlab.com:27565/auxdatabase'); //connect to Mongo database
require('./models/playlist');

// Generate variables for routes
var index = require('./routes/index');
var users = require('./routes/users');
var playlists = require('./routes/playlists');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Redirect routes to the controllers.
app.use('/', index);
app.use('/users', users);
app.use('/playlists', playlists);
app.use(express.static('/routes'));

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
