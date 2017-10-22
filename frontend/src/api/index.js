// The service for API calls
// Configurations for requests

const url = 'http://localhost:3000/';
const api = {
  song_search_url: 'url1',
  song_add_url: 'url2',
  song_vote_url: 'url3'
};

export default {

  createRoom () {

  },

  getSongSearchResults (context, search_text, callback) {

    let body = { };

    context.$http.post(api.song_search_url, body).then(callback);

  },

  addSong (context, song_id, callback) {

    let body = { };

    context.$http.post(api.song_search_url, body).then(callback);

  },

  fetchRoom (context, room_code, callback) {

  }
}