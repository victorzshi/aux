<template>
<section id="background" class="hero is-light is-bold is-fullheight">
  <!-- Hero head: will stick at the top -->
  <div class="hero-head">
    <div class="container">
      <nav class="level">
        <!-- Left side -->
	      <div id="aux_logo_container" class="level-item">
	        <a href="#"><img id="aux_logo" src="../assets/aux_logo.svg"/></a>
	      </div>
        <!-- Right side -->
        <div class="level-item is-hidden-mobile">
          <div class="level-item">
            <a href="#"><h2 class="subtitle has-text-white">About</h2></a>
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
        <div id="buttons" class="column is-centered is-narrow">

          <!-- Create room button -->
          <div class="column">
            <a href="/users/auth/spotify" class="button is-dark is-inverted is-large has-text-weight-bold">
              <span>Host</span>
            </a>
          </div>

          <!-- Text field to enter room code -->
          <div  class="columns is-centered is-marginless">
            <div  class="column is-two-thirds field">
              <div id="room_entry_field" class="control">
                <input v-model="room_code" class="input is-medium has-text-centered has-text-weight-bold" type="text" placeholder="Room Code" autofocus>
                <span class="underline"></span>
              </div>
            </div>
          </div>

          <!-- Join existing room submit button -->
          <div class="column">
            <a v-on:click="goToRoom" class="button is-dark is-inverted is-large has-text-weight-bold">
              <span>Join</span>
            </a>
          </div>
          
        </div>
        <!-- End of buttons -->

        <!-- Start of visuals -->
        <div class="column is-half is-hidden-mobile">

          <div class="column has-text-centered">
            <h2 class="subtitle has-text-white">
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
      <nav class="level has-text-centered-mobile has-text-white">

        <!-- Left side -->
        <div class="level-left">
          <div class="content">
            <p>Made for Basement Hacks 2017</p>
          </div>
        </div>

        <div class="level-item">
          <div class="content">
          	<!-- This <br> is for mobile display right now -->
            <p>Created by Andrew McCann, Sangeet Parashar,<br>Jerry Yuan Chen, and Victor Shi</p>
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

html, body {
	position: absolute;
}

.hero-head {
  margin-top: 2.5%;
}

.button {
	border-radius: 100px;
	padding-left: 20%;
	padding-right: 20%;
}

#aux_logo {
  max-width: 128px;
}
#aux_logo_container {
  margin-top: 2.5%;
}
#background {
	/* 
		Format rgba(255,0,0,0)
		Colours: 
			#ab47bc (purple)
			#ef9a9a (salmon pink)
		Transparency: 50%;
	*/
  background: linear-gradient(rgba(171, 71, 188,0.5) 10%, rgba(239, 154, 154,0.5) 35%, transparent), 
  url(../assets/party-desktop.jpg) no-repeat center;
}

#buttons {
	padding-top: 10%;
}

#buttons .button {
  display: flex;
  align-items: center;
  justify-content: center;
/*  border-style: solid;
  border-width: 2px;
  border-color: black;*/
}

#room_entry_field {
	/* Center the button somehow*/
  /*width: 150px;*/
}

input {
	/* Temp colour */
  background-color: rgba(220,220,220,0.5); 
  border: none;
  border-bottom: 1px solid grey;
  /*color: white;*/
  /*box-sizing: border-box;*/
  /*font-size: 2rem;*/
  /*margin: -25px 0 0 -100px;*/
  /*padding: 10px 0px;*/
  position: relative;
  overflow: hidden;

  *:focus {
    outline: none;    
  }
}

textarea:focus, input:focus{
    outline: none;
}

/* Inside text of room code */
input::-webkit-input-placeholder {
  color: #696969;
  /*color: black;*/
}

input:focus::-webkit-input-placeholder {
  color: white;
}

.input:focus+.underline {
  transform: scale(1);
}

.underline {
  background-color: white;
  display: inline-block;
  height: 4px;
  /*left: 50px;*/
  /*margin-top: -4px;*/
  position: absolute;
  /*top: 185px;*/
  -webkit-transform: scale(0, 1);
  transform: scale(0, 1);
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  /* Get the right distance*/
  width: 140px;
}

#footer {
  margin-bottom: 2.5%;
}

/* This is inefficient, loads mobile after loading desktop settings */
/* Need to do media query for desktop */
@media only screen and (max-width: 768px) {

	#aux_logo {
	  max-width: 192px;
	}

	#aux_logo_container {
	  margin-top: 25%; 
	}

	#background {
	  background: linear-gradient(rgba(171, 71, 188,0.5) 10%, rgba(239, 154, 154,0.5) 30%, transparent), 
	  url(../assets/party-mobile.jpg) no-repeat center;
	  /* Resize image to be smaller */
	  background-size: contain;
	}

	#buttons {
		padding-top: 0%;

	}

	.button {
		/*max-width: 100px;*/
		margin-left: 25%;
		margin-right: 25%;
	}

	#room_entry_field {
	  padding-left: 30%;
	  padding-right: 30%;
	}

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