var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var SpotifyWebApi = require('spotify-web-api-node');
var mongoose = require('mongoose');
var Playlist = mongoose.model('Playlist');

var router = express.Router();

router.get('/create', function(req, res) {

	// create playlist

	print('yo');
	var playlist = new Playlist();
	playlist.hostName = 'amccannv';
	// TO DO SAVE PLAYLIST WHEN CREATING
	message.save(function(err, message) {
		if (err){
			return res.send(500, err);
		}
		return res.json(message);
	});
	return spotifyApi.createPlaylist('amccannv', 'Test', {public: true})
		.then(function(data) {
			console.log('Playlist created!');
			return res.json(data.body);
		}).catch(function(err) {
			console.log('Something went wrong!', err.message);
			return res.send(500).send(err);
		});
});

router.post('/addTrack', function(req, res) {

	// create playlist
	Playlist.find({playlistName: req.body.playlistName}, function (err, playlist){
		if(err)
			res.send(err);
		//var playlistID = playlist[0].playlistID;
		console.log(playlist);
	});
	return spotifyApi.addTracksToPlaylist('amccannv', 'spotify:user:amccannv:playlist:6q3S0ouSoYMLC7tDPOFdl8', 'spotify:track:62dpuFjYSBBshX8C65oOm3')
		.then(function(data) {
			console.log('Song added!');
			return res.json(data.body);
		}).catch(function(err) {
			console.log('Something went wrong!', err.message);
			return res.send(500).send(err);
		});
});

module.exports = router;