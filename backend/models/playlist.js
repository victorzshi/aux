var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var songSchema = new mongoose.Schema({
	songID: String,
	upvotes: Number
});

mongoose.model('Song', songSchema);

var playlistSchema = new mongoose.Schema({
	hostName: String,
	playlistID: String,
	playlistName: String,
	songs: [songSchema]
});

mongoose.model('Playlist', playlistSchema);