<template>
  <div id="app">
    <app-layout></app-layout>
  </div>
</template>

<script>
import AppLayout from '@/AppLayout'

export default {
  name: 'App',
  components: {
    AppLayout
  }
}
</script>

<style lang="scss">
html {
  height: 100%;
  body {
    height: 100%;

    --app-margin: 10px;
    --to-menu-height: 60px;
    --to-menu-padding: 5px;
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;

  margin: var(--ap-margin);
}
</style>
