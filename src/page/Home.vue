<template>
  <section class="home">
    <grid-table
    :data="gridData"
    :columns="columns"
    :loadMore="loadMore"
    >
    </grid-table>
  </section>
</template>

<script>
import GridTable from '@/components/GridTable'

export default {
  name: 'Home',
  components: {
    GridTable
  },
  data () {
    return {
      isFixed: false,
      msg: 'Welcome to Your Vue.js App',
      columns: ['name', 'power'],
      gridData: [
        { id: 1, name: 'Chuck Norris', power: Infinity },
        { id: 2, name: 'Bruce Lee', power: 9000 },
        { id: 3, name: 'Jackie Chan', power: 7000 },
        { id: 4, name: 'Jet Li', power: 8000 },
        { id: 5, name: 'Chuck Norris', power: Infinity },
        { id: 6, name: 'Bruce Lee', power: 9000 },
        { id: 7, name: 'Jackie Chan', power: 7000 },
        { id: 8, name: 'Jet Li', power: 8000 },
        { id: 10, name: 'Chuck Norris', power: Infinity },
        { id: 11, name: 'Bruce Lee', power: 9000 },
        { id: 12, name: 'Jackie Chan', power: 7000 },
        { id: 13, name: 'Jet Li', power: 8000 },
        { id: 14, name: 'Chuck Norris', power: Infinity },
        { id: 15, name: 'Bruce Lee', power: 9000 },
        { id: 16, name: 'Jackie Chan', power: 7000 },
        { id: 17, name: 'Jet Li', power: 8000 },
        { id: 18, name: 'Chuck Norris', power: Infinity },
        { id: 19, name: 'Bruce Lee', power: 9000 },
        { id: 20, name: 'Jackie Chan', power: 7000 },
        { id: 21, name: 'Jet Li', power: 8000 },
        { id: 22, name: 'Chuck Norris', power: Infinity },
        { id: 23, name: 'Bruce Lee', power: 9000 },
        { id: 24, name: 'Jackie Chan', power: 7000 },
        { id: 25, name: 'Jet Li', power: 8000 },
        { id: 26, name: 'Chuck Norris', power: Infinity },
        { id: 27, name: 'Bruce Lee', power: 9000 },
        { id: 28, name: 'Jackie Chan', power: 7000 },
        { id: 29, name: 'Jet Li', power: 8000 },
        { id: 30, name: 'Chuck Norris', power: Infinity },
        { id: 31, name: 'Bruce Lee', power: 9000 },
        { id: 32, name: 'Jackie Chan', power: 7000 },
        { id: 33, name: 'Jet Li', power: 8000 },
        { id: 34, name: 'Chuck Norris', power: Infinity },
        { id: 35, name: 'Bruce Lee', power: 9000 },
        { id: 36, name: 'Jackie Chan', power: 7000 },
        { id: 37, name: 'Jet Li', power: 8000 }
      ]
    }
  },
  methods: {
    loadMore () {
      console.log('--home load more-')
      this.busy = true

      // console.log(`gridData length start: ${this.gridData.length}`)

      // setTimeout(() => {
      //   for (var i = 0, j = 10; i < j; i++) {
      //     this.gridData.push({ name: 'test' })
      //   }
      //   this.busy = false
      // }, 1000)
      // console.log(`gridData length end: ${this.gridData.length}`)
    }
  }
}
</script>

<style scoped>
.home {
  margin: 10px;
}
</style>
