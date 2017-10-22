// The service for API calls
// Configurations for requests

const url = 'http://localhost:3000/';
const api = {
  create_room_url: url + 'playlists/create/',
  get_rooms_url: url + 'playlists/getUsersPlaylists',
  song_search_url: url + 'playlists/search/',
  song_add_url: url + 'playlists/addTrackToQueue/',
  song_upvote_url: url + 'playlists/upvoteSong/',
  update_room_url: url + 'playlists/getPlaylist/'
};

export default {

  /* USER */
  createRoom (context, playlist_name, callback) {
    let body = { params: { playlistName: playlist_name } };
    context.$http.get(api.create_room_url, body).then(callback);
  },

  getRooms (context, callback) {
    let body = { };
    context.$http.get(api.get_rooms_url, body).then(callback);
  },

  /* ROOM */
  getSongSearchResults (context, search_text, callback) {

    let body = { params: { searchQuery: search_text } };
    context.$http.get(api.song_search_url, body).then(callback);
  },

  addSong (context, playlist_id, song_id, callback) {

    let body = { 
      params: {
        playlistID: playlist_id,
        trackID: song_id,
      }
    };
    context.$http.get(api.song_add_url, body).then(callback);
  },

  upvoteSong () {

  },

  updateRoom (context, code, callback) {
    let body = { params: { auxCode: code } };
    context.$http.get(api.update_room_url, body).then(callback);
  }
}