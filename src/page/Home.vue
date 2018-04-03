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
import { mapActions, mapGetters } from 'vuex'

import GridTable from '@/components/GridTable'
import messageJson from '@/api/ant/message.json'

export default {
  name: 'Home',
  components: {
    GridTable
  },
  data () {
    return {
      isLoadBusy: false,
      columns: ['pk', 'message', 'ai_intent', 'ai_agt', 'ent_ai', 'ent_ag'],
      // gridData: this.getMessages(),
      gridData: messageJson.results,
      apiCursor: null,
      apiQuery: {}
    }
  },
  methods: {
    ...mapActions({
      fetchMessages: 'messages/fetchMessages'
    }),
    ...mapGetters({
      getMessages: 'messages/MESSAGES'
    }),
    async loadMore () {
      const result = await this.fetchMessages()
      console.log(result)
      this.isLoadBusy = false
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
