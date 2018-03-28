<template>
  <div id="topMenu" class="topMenu">
    <nav v-on:click.prevent>
      <router-link to="/"> Home </router-link>
      <router-link to="/import"> Excel Import </router-link>
    </nav>
  </div>
</template>

<script>
import _throttle from 'lodash.throttle'

export default {
  name: 'TopMenu',
  methods: {
    handleScroll: _throttle(() => {
      const header = document.getElementById('topMenu')
      const sticky = header.offsetTop
      if (window.pageYOffset >= sticky) {
        header.classList.add('sticky')
      } else {
        header.classList.remove('sticky')
      }
    }, 250)
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss" scoped>
.topMenu {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: var(--to-menu-height);
  padding: var(--to-menu-padding);

  nav {
    display: inline-block;
    margin: 5px auto;
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

.sticky {
  position: fixed;
  top: 0;
}
</style>
