<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { usersApi } from './utils/api'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted () {
    // console.log(usersApi.editUser(1, {
    //   "id": 1,
    //   "FIO": "DDDD Я. А.",
    //   "job": null,
    //   "task": null
    // },));
  }
}
</script>

<style>

</style>
