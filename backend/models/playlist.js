var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playlistSchema = new mongoose.Schema({
	hostName: String,
	playlistID: String,
	playlistName: String
});

mongoose.model('Playlist', playlistSchema);