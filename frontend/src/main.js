// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import resource from 'vue-resource'

/* eslint-disable no-new */

Vue.use(resource)

/* Initializes the Vue object */
/* Depending on the url, the <router-view> will display different containers */
/* Check ./router.js for the routes */
new Vue({
  el: '#app',
  template: '<router-view></router-view>',
  router
})  