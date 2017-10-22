var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var SpotifyWebApi = require('spotify-web-api-node');
var mongoose = require('mongoose');
var Playlist = mongoose.model('Playlist');
var Song = mongoose.model('Song');

var router = express.Router();

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

// create playlist
router.get('/create', function(req, res) {

	var playlist = new Playlist();
	playlist.hostName = req.query.hostName;
	playlist.playlistName = req.query.playlistName;
	playlist.songs = [];
	playlist.songQueue = [];

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

//search for a song
router.get('/search', function(req, res) {
		// Search tracks whose name, album or artist contains the variable we input
		var info = 'drugs';
		spotifyApi.searchTracks(info)
		  .then(function(data) {
		    console.log('Search by: ', info);
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
			    	}
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

		// check if song is in queue before adding
		for (var i = 0; i < songQueue.length; i++) {
			if (songQueue[i].songID == req.query.trackID) {
				res.send('Song already in queue.');
			}
			else {
				var song = new Song();
				song.songID = req.query.trackID;
				song.upvotes = 0;

				playlist.songQueue.push(song);
				playlist.save();
				console.log(playlist);

				res.send('Song added to queue.');
			}
		}
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

		var song = new Song();
		song.songID = req.query.trackID;
		song.upvotes = 0;

		playlist.songs.push(song);
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