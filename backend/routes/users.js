var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var SpotifyWebApi = require('spotify-web-api-node');
var session = require('express-session'),
	passport = require('passport'),
	SpotifyStrategy = require('passport-spotify').Strategy;

var router = express.Router();

var client_id = '2421a4b55e5c457eb279cacbacb9d318'; // Your client id
var client_secret = '97d2682f52c44db6ab68a812d72e59c0'; // Your secret
var redirect_uri = 'http://localhost:3000/users/callback'; // Your redirect uri
spotifyApi = new SpotifyWebApi({
	clientId : client_id,
	clientSecret : client_secret,
	redirectUri : redirect_uri
});

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session. Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing. However, since this example does not
//   have a database of user records, the complete spotify profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
	done(null, user);
	console.log(user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

// Use the SpotifyStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and spotify
//   profile), and invoke a callback with a user object.
passport.use(new SpotifyStrategy({
		clientID: client_id,
		clientSecret: client_secret,
		callbackURL: 'http://localhost:3000/users/callback'
	},
	function(accessToken, refreshToken, profile, done) {
		// asynchronous verification, for effect...
		spotifyApi.setAccessToken(accessToken);
		process.nextTick(function () {
			// To keep the example simple, the user's spotify profile is returned to
			// represent the logged-in user. In a typical application, you would want
			// to associate the spotify account with a user record in your database,
			// and return that user instead.
			return done(null, profile);
		});
	}
));

router.get('/account', ensureAuthenticated, function(req, res){
	res.render('account.html', { user: req.user });
});

router.get('/login', function(req, res){
	res.render('login.html', { user: req.user });
});

// GET /auth/spotify
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in spotify authentication will involve redirecting
//   the user to spotify.com. After authorization, spotify will redirect the user
//   back to this application at /auth/spotify/callback
router.get('/auth/spotify',
	passport.authenticate('spotify', {scope: ['user-read-private user-read-email playlist-modify-public playlist-modify-private'], showDialog: true}),
	function(req, res){
// The request will be redirected to spotify for authentication, so this
// function will not be called.
	});

// GET /auth/spotify/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request. If authentication fails, the user will be redirected back to the
//   login page. Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/callback',
	passport.authenticate('spotify', { failureRedirect: '/login' }),
	function(req, res) {
		res.redirect('/');
	});

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed. Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/login');
}

// /**
//  * Generates a random string containing numbers and letters
//  * @param  {number} length The length of the string
//  * @return {string} The generated string
//  */
// var generateRandomString = function(length) {
// 	var text = '';
// 	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//
// 	for (var i = 0; i < length; i++) {
// 		text += possible.charAt(Math.floor(Math.random() * possible.length));
// 	}
// 	return text;
// };
//
// var stateKey = 'spotify_auth_state';
//
// router.get('/login', function(req, res) {
//
// 	var state = generateRandomString(16);
// 	res.cookie(stateKey, state);
//
// 	// your application requests authorization
// 	var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
// 	res.redirect('https://accounts.spotify.com/authorize?' +
// 		querystring.stringify({
// 			response_type: 'code',
// 			client_id: client_id,
// 			scope: scope,
// 			redirect_uri: redirect_uri,
// 			state: state
// 		}));
// });
//
// router.get('/callback', function(req, res) {
// 	// your application requests refresh and access tokens
// 	// after checking the state parameter
//
// 	var code = req.query.code || null;
// 	var state = req.query.state || null;
// 	var storedState = req.cookies ? req.cookies[stateKey] : null;
//
// 	if (state === null || state !== storedState) {
// 		res.redirect('/#' +
// 			querystring.stringify({
// 				error: 'state_mismatch'
// 			}));
// 	} else {
// 		res.clearCookie(stateKey);
// 		var authOptions = {
// 			url: 'https://accounts.spotify.com/api/token',
// 			form: {
// 				code: code,
// 				redirect_uri: redirect_uri,
// 				grant_type: 'authorization_code'
// 			},
// 			headers: {
// 				'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
// 			},
// 			json: true
// 		};
//
// 		request.post(authOptions, function(error, response, body) {
// 			if (!error && response.statusCode === 200) {
//
// 				var access_token = body.access_token,
// 					refresh_token = body.refresh_token;
// 				spotifyApi.setAccessToken(access_token);
//
// 				var options = {
// 					url: 'https://api.spotify.com/v1/me',
// 					headers: { 'Authorization': 'Bearer ' + access_token },
// 					json: true
// 				};
//
// 				// use the access token to access the Spotify Web API
// 				request.get(options, function(error, response, body) {
// 					console.log(body);
// 				});
//
// 				// we can also pass the token to the browser to make requests from there
// 				res.redirect('/#' +
// 					querystring.stringify({
// 						access_token: access_token,
// 						refresh_token: refresh_token
// 					}));
// 			} else {
// 				res.redirect('/#' +
// 					querystring.stringify({
// 						error: 'invalid_token'
// 					}));
// 			}
// 		});
// 	}
// });
//
// router.get('/refresh_token', function(req, res) {
//
// 	// requesting access token from refresh token
// 	var refresh_token = req.query.refresh_token;
// 	var authOptions = {
// 		url: 'https://accounts.spotify.com/api/token',
// 		headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
// 		form: {
// 			grant_type: 'refresh_token',
// 			refresh_token: refresh_token
// 		},
// 		json: true
// 	};
//
// 	request.post(authOptions, function(error, response, body) {
// 		if (!error && response.statusCode === 200) {
// 			var access_token = body.access_token;
// 			spotifyApi.setAccessToken(access_token);
// 			res.send({
// 				'access_token': access_token
// 			});
// 		}
// 	});
// });

module.exports = router;
