<template>
  <div id="app">
    <fullscreen :fullscreen.sync="$store.state.fullscreen">
      <router-view />
    </fullscreen>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
html,
body {
  width: 100%;
  height: 100%;
}
a {
  text-decoration: none;
}
</style>
