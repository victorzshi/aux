<template>
<div class="container">

<!-- Search Bar --> 
<section>
  <p class="control has-icons-left">
    <input v-model.trim="search_text" class="input is-primary is-large" type="text" placeholder="Search">
    <span class="icon is-left">
      <i class="fa fa-search"></i>
    </span>
  </p>
</section>

<!-- Search Dropdown -->
<section v-if="search_text">
  <table class="table is-fullwidth is-hoverable">
    <tbody>
      <tr v-for="song in songs">
        <td>
          <span class="icon is-medium">
            <i class="fa fa fa-2x fa-plus-circle"></i>
          </span>
          <strong>{{song.title}} </strong>{{song.artist}}
        </td>
      </tr>
    </tbody>
  </table>
  <p v-if="!songs || !songs.length">The queue is currently empty</p>
</section>  

<!-- Current Song -->
<section v-if="!search_text">
  
  <h1 class="title is-2">Current Song</h1>
  <article class="media current-song">
    <figure class="media-left">
      <p class="image is-64x64">
        <img src="https://bulma.io/images/placeholders/128x128.png">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <div v-if="current_song">
            <strong>Song</strong><br>Artist
          </div>
          <div v-else>
            No song is currently playing
          </div>
        </p>
      </div>
    </div>

  </article>

</section>  

<!-- Voting Queue -->
<section v-if="!search_text">

  <h1 class="title is-2">Song Queue</h1>
  <table class="table is-fullwidth is-hoverable">
    <tbody>
      <tr v-for="result in search_results">
        <td>
          <span class="icon is-medium" v-click="upvoteSong(result)">
            <i class="fa fa fa-2x fa-arrow-circle-up"></i>
          </span>
          <strong>{{result.title}} </strong>{{result.artist}}
        </td>
      </tr>
    </tbody>
  </table>
  <p v-if="!search_results || !search_results.length">The queue is currently empty</p>

</section>

</div>
</template>

<style scoped>

.container {
  padding: 0.5em;
}

article.current-song {
  padding: 0.5em;
}

h1.title {
  margin-top: 0.7em;
  margin-bottom: 0.2em;
}

td {
  overflow: hidden;
  white-space: nowrap;
  padding: 0.5em;
  vertical-align: middle;
}

</style>

<script>

import api from '../api'
import socket from '../sockets'

export default {
  name: 'home',
  components: { },
  data () {
    return {
      room_code: null,
      room_id: null,
      current_song: null,
      search_text: '',
      songs: [
        {title: 'asdasd', artist: 'asdasdaadskfjad;flkj'},
        {title: 'asdasd', artist: 'asdasdasdsd'},
        {title: 'asdasd', artist: 'asdasdasdsd'},
        {title: 'asdasd', artist: 'asdasdasdsd'}
      ],
      search_results: [
        {title: 'asdasd', artist: 'asdasdaadskfjad;flkj'},
        {title: 'asdasd', artist: 'asdasdasdsd'},
        {title: 'asdasd', artist: 'asdasdasdsd'},
        {title: 'asdasd', artist: 'asdasdasdsd'}
      ]
    }
  },
  created () {
    this.fetchRoom()
  },
  methods: {
    fetchRoom (code) {
      this.room_code = this.$route.params.id

      socket.connect((new_q) => {
        // this.
      }, (close) => {

      }, (error) => {

      })
      // Connect with backend
    },
    postSong (song) {
      // send song's id to backend

      search_text = ''
    },
    upvoteSong () {

    }
  },
  watch: {
    '$route' (to, from) {
      this.fetchRoom()
    }
  }

}
</script>