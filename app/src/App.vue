<script>

import { chalkStderr } from 'chalk';
import ClockFaces from './components/ClockFaces.vue'
export default {
  components: {
    ClockFaces
  },
}
</script>

<template>
  <div id="app">
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Poiret+One");

#app {
  text-align: center;
}

.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 1280px;
  height: 1297px;
  overflow: hidden;
  margin: 0 auto;
}
</style>
