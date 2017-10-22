var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var SpotifyWebApi = require('spotify-web-api-node');
var mongoose = require('mongoose');
var Playlist = mongoose.model('Playlist');
var Song = mongoose.model('Song');

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

// create playlist
router.get('/create', function(req, res) {

	var playlist = new Playlist();
	playlist.hostName = req.query.hostName;
	playlist.playlistName = req.query.playlistName;
	playlist.songs = [];
	playlist.songQueue = [];

	var newCode = false;
	var auxCode = generateRandomString(4);

	while(newCode == false) {
		console.log('in loop');
		Playlist.find({auxCode: auxCode}, function (err, playlist){
			if(err)
				res.send(err);
			console.log(playlist);
			// if(playlist[0]) {
			// 	newCode = true;
			// 	auxCode = generateRandomString(4);
			// }
		});
	}

	playlist.auxCode = auxCode;

	// actually create playlist into host's Spotify account
	spotifyApi.createPlaylist(playlist.hostName, playlist.playlistName, {public: true})
		.then(function(data) {
			console.log('Playlist created!');
			playlist.playlistID = data.body['id'];
			console.log(playlist);

			// save playlist into mongo
			playlist.save(function(err, message) {
				if (err){
					res.send(500, err);
				}
				res.json(message);
			});

			//return res.json(data.body);
		}).catch(function(err) {
			console.log('Something went wrong!', err.message);
			res.send(500).send(err);
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
		for (var i = 0; i < songQueue.length; i++) {
			if (songQueue[i].songID == req.query.trackID) {
				var song = songQueue[i];
				playlist.songs.push(song);
				playlist.songQueue.splice(index, i);
				playlist.save();
			}
		}

		playlist.save();
		console.log(playlist);
		spotifyApi.addTracksToPlaylist(playlist.hostName, playlist.playlistID, [req.query.trackID])
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