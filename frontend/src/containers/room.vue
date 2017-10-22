<template>
<div id="page_container" class="container">

<div id="body_container">

  <!-- Search Bar --> 
  <section>
    <div class="container">
      <p class="control has-icons-left">
        <input v-model.trim="search_text" class="input is-primary is-large has-text-centered" type="text" placeholder="Search">
        <span class="icon is-left">
          <i class="fa fa-search"></i>
        </span>
      </p>
    </div>
  </section>

  <!-- Search Dropdown -->
  <section v-if="search_text" class="search-results">
    <div class="container">
      <table class="table is-fullwidth is-hoverable">
        <tbody>
          <tr v-for="result in search_results" v-on:click="postSong(result)">
            <td>
              <img class="is-square" v-bind:src="result.images">
              <span>
                <strong>{{result.song}} </strong>{{result.artist}}
              </span>

              <span class="icon is-medium">
                <i class="fa fa-2x fa-plus-circle"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-if="!songs || !songs.length">The queue is currently empty</p>
      
    </div>
  </section>  



  <!-- Voting Queue -->
  <section v-if="!search_text">

    <div class="container">

      <h1 class="title is-2 has-text-centered">Up Next</h1>
      <table class="table is-fullwidth is-hoverable">
        <tbody>
          <tr v-for="song in songs">
            <td>
              <span class="icon is-medium" v-on:click="upvoteSong(song)">
                <i class="fa fa-2x fa-arrow-circle-up"></i>
              </span>
              <strong>{{song.song}} </strong>{{song.artist}}
            </td>
          </tr>
        </tbody>
      </table>
      <p class="has-text-centered" v-if="!search_results || !search_results.length">The queue is currently empty</p>
      
    </div>

  </section>

</div>

<!-- Footer -->

<div id="footer_container">
  <!-- Current Song -->
  <section v-if="!search_text">
    
    <div class="container is-centered">
      
      <h1 class="title is-2 has-text-centered">Now Playing</h1>
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

    </div>

  </section>  
  
</div>

</div>
</template>

<style scoped>

/* Delete this shit later, and html tags */

/*body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#page_container {
  min-height: 100%;
  position: relative;
}

#body_container {
  padding-bottom: 60px;
}

#footer_container {
  bottom: 0;
  height: 60px;
}*/

input {
  border-radius: 100px;
}

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
}

.search-results .icon i {
  position: absolute;
  right: 0.5em;
  margin-top: 0.1em;
}

.search-results td img {
  width: 32px;
  height: 32px;
}

</style>

<script>

import api from '../api'
// import socket from '../sockets'

export default {
  name: 'home',
  components: { },
  data () {
    return {
      room_code: null,
      room: null,
      current_song: null,
      search_text: '',
      songs: [],
      search_results: []
    }
  },
  created () {
    this.room_code = this.$route.params.id
    this.fetchRoom()
  },
  methods: {
    getSearchResults (search_string) {
      api.getSongSearchResults (this, search_string, success => {
        this.search_results = success.body
        console.log(success.body)
      })
    },
    fetchRoom () {
      api.updateRoom(this, this.room_code, success => {
        this.room = success.body
        console.log(success.body)
      })
    },
    postSong (song) {
      api.addSong(this, this.room.playlistID, song.id, success => {
        this.fetchRoom()
        this.search_text = ''
      })
    },
    upvoteSong () {

    }
  },
  watch: {
    search_text: function (new_text, old_text) {
      if (new_text != '') {
        this.getSearchResults(new_text)
      }
    }
  }

}
</script>