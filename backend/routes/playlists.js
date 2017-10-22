var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var SpotifyWebApi = require('spotify-web-api-node');
var mongoose = require('mongoose');
var Playlist = mongoose.model('Playlist');
var Song = mongoose.model('Song');
var session = require('express-session'),
	passport = require('passport'),
	SpotifyStrategy = require('passport-spotify').Strategy;

var router = express.Router();

// sort array by key value
function sortByKey(array) {
	array.sort(function(a, b){
		var keyA = (a.upvotes),
			keyB = (b.upvotes);
		// Compare the 2 dates
		if(keyA < keyB) return -1;
		if(keyA > keyB) return 1;
		return 0;
	});
	return array;
}

// generate random string for Aux code
var generateRandomString = function(length) {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

// authenticate user
function isAuthenticated (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects

	//allow all get request methods
	if(req.method === "GET"){
		return next();
	}
	if (req.isAuthenticated()){
		return next();
	}

	// if the user is not authenticated then redirect him to the login page
	return res.redirect('/#login');
}

// get playlist based on Aux code
router.get('/getPlaylist', function(req, res) {

	var auxCode = req.query.auxCode;

	Playlist.findOne({auxCode: auxCode}, function (err, playlist) {
		if(err)
			res.send(err);
		console.log(playlist);
		playlist = playlist[0];

		if (playlist != null) {
			res.json(playlist);
		} else {
			res.send('No playlist yet.');
		}
	});

});

// get playlist based on Aux code
router.use('/getUsersPlaylists', isAuthenticated);
router.get('/getUsersPlaylists', function(req, res) {

	var hostName = req.user.username;

	Playlist.find({hostName: hostName}, function (err, playlist) {
		if(err)
			res.send(err);
		console.log(playlist);

		res.json(playlist);
	});

});

// create playlist
router.use('/create', isAuthenticated);
router.get('/create', function(req, res) {

	var playlist = new Playlist();
	playlist.hostName = req.user.username;
	playlist.playlistName = req.query.playlistName;
	playlist.songs = [];
	playlist.songQueue = [];
	playlist.auxCode = generateRandomString(6);

	// actually create playlist into hreq.query.playlistIDost's Spotify account
	spotifyApi.createPlaylist(playlist.hostName, playlist.playlistName, {public: true})
		.then(function(data) {
			console.log('Playlist created!');
			playlist.playlistID = data.body['id'];
			console.log(playlist);

			// save playlist into mongo
			playlist.save(function(err, message) {
				if (err){
					res.send(500, err);req.query.playlistID
				}
				res.json(message);
			});

		}).catch(function(err) {
			console.log('Something went wrong!', err.message);
			res.send(500).send(err);
		});

});

// search for a song
router.get('/search', function(req, res) {
		// Search tracks whose name, album or artist contains the variable we input
		var info = 'drugs';
		spotifyApi.searchTracks(req.query.searchQuery)
		  .then(function(data) {
		    console.log('Search by: ', req.query.searchQuery);
		    var Parsing = data.body;
		    var listToParse = Parsing.tracks.items;
		    finalData = [];
		     for(songs in listToParse){
			    	var lists = listToParse[songs];
			    	var artistsList = lists.album.artists[0];
			    	artists = artistsList.name;
			    	var songName = lists.name;
			    	var uri = lists.uri;
			    	var images = lists.album.images[2];
			    	var url = images.url;
			    	var InfoNeeded = {
			    		'artist': artists,
			    		'song' : songName,
			    		'uri' : uri,
			    		'images' : url
			    	};
			    	finalData.push(InfoNeeded);
			    	//var artist = artistsList['artists']['name'];
			    	}
		    res.send(finalData);
		  }, function(err) {
		    console.error(err);
		  });
});

// add track to queue
router.get('/addTrackToQueue', function(req, res) {

	console.log(req.query.playlistID);
	Playlist.find({playlistID: req.query.playlistID}, function (err, playlist){
		if(err)
			res.send(err);
		console.log(playlist);
		playlist = playlist[0];

		var songQueue = playlist.songQueue;

		// check if song is in queue before adding
		for (var i = 0; i < songQueue.length; i++) {
			if (songQueue[i].songID == req.query.trackID) {
				res.send('Song already in queue.');
			}
		}

		// if not in queue, add to queue
		var song = new Song();
		song.songID = req.query.trackID;
		song.upvotes = 0;

		playlist.songQueue.push(song);
		playlist.save();
		console.log(playlist);

		res.send('Song added to queue.');
	});

});

// upvote song in given party queue
router.get('/upvoteSong', function(req, res) {
	Playlist.find({playlistID: req.query.playlistID}, function (err, playlist) {
		if(err)
			res.send(err);
		console.log(playlist);
		playlist = playlist[0];

		var songQueue = playlist.songQueue;

		for (var i = 0; i < songQueue.length; i++) {
			if (songQueue[i].songID == req.query.trackID) {
				songQueue[i].upvotes += 1;
			}
		}

		playlist.songQueue = songQueue;
		playlist.songQueue = sortByKey(playlist.songQueue);

		console.log(playlist.songQueue);
		playlist.save();
		res.send('Song upvoted.');
	});
});

// add track to playlist
router.get('/addTrackToPlaylist', function(req, res) {

	console.log(req.query.playlistID);
	Playlist.find({playlistID: req.query.playlistID}, function (err, playlist) {
		if(err)
			res.send(err);
		console.log(playlist);
		playlist = playlist[0];

		var songQueue = playlist.songQueue;

		// add to songs, remove from song queue
		var song = songQueue[songQueue.length - 1];
		playlist.songs.push(song);
		playlist.songQueue.splice(songQueue.length - 1, 1);

		playlist.save();
		console.log(playlist);
		spotifyApi.addTracksToPlaylist(playlist.hostName, playlist.playlistID, [song.songID])
			.then(function(data) {
				console.log('Song added!');
				res.send('All good.');
			}).catch(function(err) {
				console.log('Something went wrong!', err.message);
				res.send(err);
			});
	});

});

module.exports = router;