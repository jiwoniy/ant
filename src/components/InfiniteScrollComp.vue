<template>
  <div
    class="infinite-scroll"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="distance"
  >
   <slot></slot>
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
    }
  },
  data: () => {
    return {
      busy: false,
      count: 0
    }
  },
  methods: {
    loadMore () {
      this.busy = true

      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i++) {
          this.datas.push({ name: this.count++ })
        }
        this.busy = false
      }, 1000)
    }
  }
}
</script>

<style scoped>
.infinite-scroll {
  position: relative;
}
</style>
