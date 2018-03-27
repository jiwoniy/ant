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
      columns: ['pk', 'message', 'ai_intent', 'ai_agent', 'ent_ai', 'ent_ag'],
      gridData: messageJson.results,
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
        for (var i = 0, j = 10; i < j; i++) {
          this.gridData.push({ pk: this.gridData.length + 2, message: 'Jackie Chan', power: 7000 })
        }
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
