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
	auxCode: String,
	playlistName: String,
	songs: [songSchema],
	songQueue: [songSchema]
});

mongoose.model('Playlist', playlistSchema);