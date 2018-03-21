<template>
  <section class="home">
    <infinite-scroll-comp
      :datas="gridData"
    >
      <grid-table
      :data="gridData"
      :columns="columns"
      >
      </grid-table>
    </infinite-scroll-comp>
  </section>
</template>

<script>
import GridTable from '@/components/GridTable'
import InfiniteScrollComp from '@/components/InfiniteScrollComp'

export default {
  name: 'Home',
  components: {
    InfiniteScrollComp,
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
        { id: 4, name: 'Jet Li', power: 8000 }
      ]
    }
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  margin: 10px;
}
</style>
