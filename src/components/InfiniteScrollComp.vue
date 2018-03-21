<template>
  <div
    class="infinite-scroll"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="distance"
  >
  <!-- <div
    class="infinite-scroll"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="distance"
  > -->
   <slot>
   </slot>
   <!-- <infinite-loading @infinite="loadMore"></infinite-loading> -->
  </div>
</template>

<script>

export default {
  props: {
    datas: {
      type: Array,
      default: () => []
    },
    distance: {
      type: Number,
      default: 10
    },
    loadMore: {
      type: Function,
      required: true
    }
  },
  data: () => {
    return {
      busy: false,
      count: 0
    }
  }
}
</script>

<style scoped>
.infinite-scroll {
  position: relative;
}
</style>
