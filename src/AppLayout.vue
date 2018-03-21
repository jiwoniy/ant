<template>
  <div
   :class="layoutCss"
  >
    <top-menu
      v-if="$mq === 'xsm' || $mq === 'sm' || $mq === 'md'"
    ></top-menu>
    <side-menu
      v-if="$mq === 'lg' || $mq === 'xlg'"
    >
    </side-menu>
    <router-view :class="routerCss"/>
  </div>
</template>

<script>
import TopMenu from '@/components/Menu/Top'
import SideMenu from '@/components/Menu/Side'

export default {
  name: 'App',
  components: {
    TopMenu,
    SideMenu
  },
  computed: {
    routerCss () {
      const mq = this.$mq
      return `router--${mq}`
    },
    layoutCss () {
      const mq = this.$mq
      return `layout--${mq}`
    }
  }
}

</script>

<style socoped>
.layout {
  height: 100%;
  display: flex;
  overflow-x: hidden;
}

.layout--xsm, .layout--sm, .layout--md {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.layout--lg, .layout--xlg {
  height: 100%;
  display: flex;
  flex-direction: row;
}

.router--xsm, .router--sm, .router--md {
  width: 100%;
  position: absolute;
  top: calc(var(--to-menu-height) + (var(--to-menu-padding) * 2));

}

.router--lg, .router--xlg {
  position: absolute;
  width: calc(100% - 200px);
  left: 200px;
}

</style>
