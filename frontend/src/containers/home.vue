<template>
<section id="background" class="hero is-light is-bold is-fullheight">
  <!-- Hero head: will stick at the top -->
  <div class="hero-head">
    <div class="container">
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <a href="#"><img id="aux_logo" src="../assets/aux_logo.svg"/></a>
          </div>
        </div>
        <!-- Right side -->
        <div class="level-right">
          <div class="level-item">
            <a href="#"><h2 class="subtitle">About</h2></a>
          </div>
        </div>
      </nav>
      
    </div>
  </div>

  <!-- Hero content: will be in the middle -->
  <div class="hero-body">
    <div class="container has-text-centered">
      <div class="columns is-centered">

        <!-- Start of buttons -->
        <div id="buttons">
          <div class="column is-centered is-narrow">

            <!-- Create room button -->
            <div class="column">
              <a href="/users/auth/spotify" class="button is-dark is-inverted is-large">
                <!-- For icon -->
                <!-- <span class="icon is-medium">
                  <i class="fa fa-github"></i>
                </span> -->
                <span>Create a Room</span>
              </a>
            </div>

            <!-- Text field to enter room code -->
            <div id="room_entry_field" class="columns is-centered">
              <div class="column is-two-thirds field">
                <div class="control">
                  <input v-model="room_code" class="input is-medium has-text-centered" type="text" placeholder="Room Code">
                </div>
              </div>
            </div>

            <!-- Join existing room submit button -->
            <div class="column">
              <a v-on:click="goToRoom" class="button is-dark is-inverted is-large">
                <!-- For icon -->
                <!-- <span class="icon is-medium">
                  <i class="fa fa-github"></i>
                </span> -->
                <span>Join</span>
              </a>
            </div>
            
          </div>
        </div>
        <!-- End of buttons -->

        <!-- Start of visuals -->
        <div class="column is-half">
          <div class="column has-text-centered">
            <h2 class="subtitle">
              Popular rooms right now
            </h2>
          </div>

          <!-- Pictures first row-->
          <div class="columns">
            <div class="column">
              <figure class="image is-1by1">
                <img src="https://bulma.io/images/placeholders/256x256.png">
              </figure>
            </div>
            <div class="column">
              <figure class="image is-1by1">
                <img src="https://bulma.io/images/placeholders/256x256.png">
              </figure>
            </div>
            <div class="column">
              <figure class="image is-1by1">
                <img src="https://bulma.io/images/placeholders/256x256.png">
              </figure>
            </div>
          </div>

          <!-- Pictures second row-->
          <div class="columns">
            <div class="column">
              <figure class="image is-1by1">
                <img src="https://bulma.io/images/placeholders/256x256.png">
              </figure>
            </div>
            <div class="column">
              <figure class="image is-1by1">
                <img src="https://bulma.io/images/placeholders/256x256.png">
              </figure>
            </div>
            <div class="column">
              <figure class="image is-1by1">
                <img src="https://bulma.io/images/placeholders/256x256.png">
              </figure>
            </div>
          </div>

        </div>
        <!-- End of visuals -->

      </div>
    </div>
  </div>

  <!-- Hero footer: will stick at the bottom -->
  <div id="footer" class="hero-foot">
    <div class="container">
      <nav class="level">

        <!-- Left side -->
        <div class="level-left">
          <div class="content">
            <p>Made for Basement Hacks 2017</p>
          </div>
        </div>

        <div class="level-item">
          <div class="content">
            <p>Created by Andrew McCann, Sangeet Parashar, Jerry Yuan Chen, and Victor Shi</p>
          </div>
        </div>


        <!-- Right side -->
        <div class="level-right">
          <a href="https://bulma.io">
            <img src="../assets/made-with-bulma--dark.png" alt="Made with Bulma" width="128" height="24">
          </a>
        </div>

      </nav>
    </div>
  </div>
</section>
</template>

<style scoped>

.hero-head {
  margin-top: 2.5%;
}

#aux_logo {
  max-width: 128px;
}

#buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}

#room_entry_field {
  margin-top: 15%;
}

#footer {
  margin-bottom: 2.5%;
}

#background {
  background: linear-gradient(#AB47BC, #EF9A9A);
}

</style>

<script>

import router from '../router'

export default {
  name: 'home',
  components: { },
  data () {
    return {
      room_code: ''
    }
  },
  created () {

  },
  methods: {
    goToRoom () {
      router.push({ name: 'room', params: { id: this.room_code }})
    }
  }

}
</script>