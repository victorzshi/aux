// The service for API calls
// Configurations for requests

const url = 'http://localhost:3000/';
let socket = null;

export default {

  connect (new_q_cb, new_song_cb, error_cb, close_cb) {
    
    socket = io();

    socket.on('connect_error', error_cb);

    socket.on('new_q', (error) => {
      // ...
    });

    socket.on('close', (error) => {
      // ...
    });

    // socket.on()
    if (socket) { }
  },

  close (callback) {
    socket.close();
  }
}