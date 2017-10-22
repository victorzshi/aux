// The service for API calls
// Configurations for requests

const url = 'http://localhost:3000/';
const api = {
  create_room_url: url + 'playlists/create',
  get_rooms_url: url + 'users/account/',
  song_search_url: url + 'playlists/search',
  song_add_url: url + 'playlists/addTrackToQueue',
  song_upvote_url: url + 'playlists/upvoteSong',
  update_room_url: url + 'playlists/getPlaylist'
};

export default {

  /* USER */
  createRoom () {
    let body = { };
    context.$http.get(api.song_search_url, body).then(callback);
  },

  getRooms () {
    let body = { };
    context.$http.get(api.song_search_url, body).then(callback);
  },

  /* ROOM */
  getSongSearchResults (context, search_text, callback) {

    let body = { params: { searchQuery: search_text } };
    context.$http.get(api.song_search_url, body).then(callback);
  },

  addSong (context, song_id, callback) {

    let body = { };
    context.$http.get(api.song_add_url, body).then(callback);
  },

  upvoteSong () {

  },

  updateRoom () {

  }
}