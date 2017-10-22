<template>
<div class="container">

<!-- Search Bar --> 
<section>
  <nav class="level new-room">
    <div class="level-left">
      <div class="level-item">
        <div class="field has-addons">
          <p class="control">
            <input v-model.trim="new_room_name" class="input is-primary"
              type="text" placeholder="New Room Name">
          </p>
          <p class="control"><a class="button" v-on:click="createRoom(new_room_name)">Create</a></p>
        </div>
      </div>
    </div>
  </nav>

  <h1 class="title has-text-centered">Previous Rooms</h1>
  <nav class="level" v-for="room in rooms">
    <div class="level-left">
      <div class="level-item">
        <p class="subtitle is-5">
          <strong>{{room.playlistName}}</strong> 
        </p>
      </div>
      <div class="level-item">
        <p class="subtitle is-5">
          Code: <a v-on:click="goToRoom(room.auxCode)">{{room.auxCode}}</a>
        </p>
      </div>
    </div>
  </nav>
  <a href="/users/logout" class="button is-dark is-inverted is-large">
    Logout
  </a>  
</section>

</div>
</template>

<style scoped>
.container {
  padding: 0.5em;
}

.new-room {
  margin-top: 1em;
}
</style>


<script>

import api from '../api'
import router from '../router'

export default {
  name: 'home',
  components: { },
  data () {
    return {
      rooms: [],
      new_room_name: ''
    }
  },
  created () {
    this.fetchRooms()
  },
  methods: {
    fetchRooms () {
      api.getRooms(this, rooms => {
        console.log(rooms)
        this.rooms = rooms.body
      })
    },
    goToRoom () {
      router.push({ name: 'room', params: { id: this.room_code }})
    },
    createRoom (name) {
      // send song's id to backend
      if (name != '') {
        api.createRoom(this, name, rooms => {
          console.log(rooms)
          this.new_room_name = ''
          this.fetchRooms()
        })
      }
    },
    deleteRoom (id) {
      // send song's id to backend
    }
  }
}
</script>