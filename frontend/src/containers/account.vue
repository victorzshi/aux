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
          <p class="control"><a class="button" v-on:click="createRoom">Create</a></p>
        </div>
      </div>
    </div>
  </nav>

  <h1 class="title has-text-centered">Previous Rooms</h1>
  <nav class="level" v-for="room in rooms">
    <div class="level-left">
      <div class="level-item">
        <p class="subtitle is-5">
          <strong>{{room.name}}</strong> 
        </p>
      </div>
      <div class="level-item">
        <p class="subtitle is-5">
          Code: <a>{{room.code}}</a><!-- LINK TO ROOM --> 
        </p>
      </div>
    </div>
  </nav>
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

export default {
  name: 'home',
  components: { },
  data () {
    return {
      rooms: [
        {name: 'hi', code: 'kjnldkfn'},
        {name: 'hi', code: 'kjnldkfn'}],
      new_room_name: ''
    }
  },
  created () {
    this.fetchRooms()
  },
  methods: {
    fetchRooms (account) {
      
    },
    createRoom (room) {
      // send song's id to backend
      api.createRoom(this, new_room_name, (rooms) => {

      })

      new_room_name = ''
    },
    deleteRoom (id) {
      // send song's id to backend
    }
  }
}
</script>