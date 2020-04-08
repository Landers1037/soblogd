<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
#app {
  font-family: '55s','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
  @font-face {
    font-family: '55s';
    font-display: fallback;
    src: url("./assets/55s.otf") format('opentype');
  }
</style>
