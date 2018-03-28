<template>
  <aside class="menu">
    <nav v-on:click.prevent>
      <router-link to="/"> Home </router-link>
      <router-link to="/import"> Excel Import </router-link>
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;

  height: 100%;
  display: flex;
  flex-direction: row;

  nav {
    display: inline-block;
    background-color:#5597b4;
    box-shadow: 0 1px 1px #ccc;
    border-radius: 2px;
  }

  nav a {
    display:inline-block;
    padding: 18px 30px;
    color:#fff !important;
    font-weight:bold;
    font-size:16px;
    text-decoration:none !important;
    line-height:1;
    text-transform: uppercase;
    background-color:transparent;

    -webkit-transition:background-color 0.25s;
    -moz-transition:background-color 0.25s;
    transition:background-color 0.25s;
  }

  nav a:first-child{
    border-radius:2px 0 0 2px;
  }

  nav a:last-child{
    border-radius:0 2px 2px 0;
  }

  nav.home .home,
  nav.projects .projects,
  nav.services .services,
  nav.contact .contact{
    background-color:#e35885;
  }

  p {
    font-size:22px;
    font-weight:bold;
    color:#7d9098;
  }

  p b {
    color:#ffffff;
    display:inline-block;
    padding:5px 10px;
    background-color:#c4d7e0;
    border-radius:2px;
    text-transform:uppercase;
    font-size:18px;
  }
  .resource {
    margin: 20px 0;
  }
}
</style>
