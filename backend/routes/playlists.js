var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var SpotifyWebApi = require('spotify-web-api-node');
var mongoose = require('mongoose');
var Playlist = mongoose.model('Playlist');

var router = express.Router();

// create playlist
router.get('/create', function(req, res) {

	var playlist = new Playlist();
	playlist.hostName = req.query.hostName;
	playlist.playlistName = req.query.playlistName;

	// actually create playlist into host's Spotify account
	spotifyApi.createPlaylist(playlist.hostName, playlist.playlistName, {public: true})
		.then(function(data) {
			console.log('Playlist created!');
			playlist.playlistID = data.body['id'];

			console.log(data.body);
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

// add track to playlist
router.get('/addTrack', function(req, res) {


	console.log(req.query.playlistID);
	Playlist.find({playlistID: req.query.playlistID}, function (err, playlist){
		if(err)
			res.send(err);
		console.log(playlist);
		playlist = playlist[0];
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