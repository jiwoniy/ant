<template>
  <section class="home">
    <grid-table
    :data="gridData"
    :columns="columns"
    :loadMore="loadMore"
    :isLoadBusy="isLoadBusy"
    >
    </grid-table>
  </section>
</template>

<script>
import GridTable from '@/components/GridTable'
// import { message } from '@/api'
import messageJson from '@/api/message.json'

export default {
  name: 'Home',
  components: {
    GridTable
  },
  data () {
    return {
      isLoadBusy: false,
      columns: ['pk', 'message', 'ai_intent', 'ai_agent', 'ent_ai'],
      gridData: messageJson.results,
      // [
      // { pk: 1, message: 'Chuck dddddfdfdddddChuck dddddfdfdddddddddddddChuck dddddfdfdddddddddddddddddddddddddddfdfddfdfdfdfdddfdfdNorris', power: Infinity },
      // { pk: 2, message: 'Bruce Lee', ai_intent: 9000, ent_ai: 'test' },
      // { pk: 3, message: 'Jackie Chan', power: 7000 },
      // { pk: 4, message: 'Jet Li', power: 8000 },
      // { pk: 5, message: 'Chuck Norris', power: Infinity },
      // { pk: 6, message: 'Bruce Lee', power: 9000 },
      // { pk: 7, message: 'Jackie Chan', power: 7000 },
      // { pk: 8, message: 'Jet Li', power: 8000 },
      // { pk: 10, message: 'Chuck Norris', power: Infinity },
      // { pk: 11, message: 'Bruce Lee', power: 9000 },
      // { pk: 12, message: 'Jackie Chan', power: 7000 },
      // { pk: 13, message: 'Jet Li', power: 8000 },
      // { pk: 14, message: 'Chuck Norris', power: Infinity },
      // { pk: 15, message: 'Bruce Lee', power: 9000 },
      // { pk: 16, message: 'Jackie Chan', power: 7000 },
      // { pk: 17, message: 'Jet Li', power: 8000 },
      // { pk: 18, message: 'Chuck Norris', power: Infinity },
      // { pk: 19, message: 'Bruce Lee', power: 9000 },
      // { pk: 20, message: 'Jackie Chan', power: 7000 },
      // { pk: 21, message: 'Jet Li', power: 8000 },
      // { pk: 22, message: 'Chuck Norris', power: Infinity },
      // { pk: 23, message: 'Bruce Lee', power: 9000 },
      // { pk: 24, message: 'Jackie Chan', power: 7000 },
      // { pk: 25, message: 'Jet Li', power: 8000 },
      // { pk: 26, message: 'Chuck Norris', power: Infinity },
      // { pk: 27, message: 'Bruce Lee', power: 9000 },
      // { pk: 28, message: 'Jackie Chan', power: 7000 },
      // { pk: 29, message: 'Jet Li', power: 8000 },
      // { pk: 30, message: 'Chuck Norris', power: Infinity },
      // { pk: 31, message: 'Bruce Lee', power: 9000 },
      // { pk: 32, message: 'Jackie Chan', power: 7000 },
      // { pk: 33, message: 'Jet Li', power: 8000 },
      // { pk: 34, message: 'Chuck Norris', power: Infinity },
      // { pk: 35, message: 'Bruce Lee', power: 9000 },
      // { pk: 36, message: 'Jackie Chan', power: 7000 },
      // { pk: 37, message: 'Jet Li', power: 8000 }
      // ],
      apiCursor: null,
      apiQuery: {}
    }
  },
  methods: {
    loadMore () {
      this.isLoadBusy = true

      // if (this.apiCursor) {
      //   const queryString = this.apiCursor.split('?')[1]
      //   const query = decodeURIComponent(queryString)
      //   const queryList = query.split('&')
      //   queryList.forEach((queryUnit) => {
      //     const list = queryUnit.split('=')
      //     this.apiQuery[list[0]] = list[1]
      //   })
      // }

      // message.getMessage({ cursor: this.apiQuery.cursor })
      //   .then(response => {
      //     const { data } = response
      //     const { next, results } = data
      //     this.apiCursor = next
      //     this.isLoadBusy = false
      //     this.gridData.push(...results)
      //   })
      //   .catch(error => {
      //     this.isLoadBusy = false
      //     console.log('message getMessage error')
      //     console.log(error)
      //   })

      setTimeout(() => {
        // for (var i = 0, j = 10; i < j; i++) {
        //   this.gridData.push({ pk: this.gridData.length + 2, message: 'Jackie Chan', power: 7000 })
        // }
        this.isLoadBusy = false
      }, 1000)
    }
  },
  mounted () {
    this.loadMore()
  }
}
</script>

<style scoped>
.home {
  margin: 10px;
}
</style>
