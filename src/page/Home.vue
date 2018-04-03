<template>
  <section class="home">
    <grid-table
      :data="gridData"
      :columns="columns"
      :loadMore="loadMore"
      :isLoadBusy="isLoadBusy"
      :updateData="updateData"
    >
    </grid-table>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import _isEqual from 'lodash.isequal'

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
      columns: ['pk', 'message', 'ai_intent', 'intent', 'ai_entity', 'entity', 'check_status', 'skip'],
      // gridData: this.getMessages(),
      gridData: messageJson.results,
      apiCursor: null,
      apiQuery: {}
    }
  },
  methods: {
    ...mapActions({
      fetchMessages: 'messages/fetchMessages',
      updateMessage: 'messages/updateMessage'
    }),
    ...mapGetters({
      getMessages: 'messages/MESSAGES'
    }),
    async loadMore () {
      const result = await this.fetchMessages()
      console.log(result)
      this.isLoadBusy = false
    },
    updateData (updatedData, originData) {
      // TODO
      // check changed props
      // compare only "ai_agent", "ent_agent"
      // console.log(updatedData)
      // console.log(originData)
      // const updated = Object.keys(updatedData)

      // updated.forEach((org) => {
      //   if (org === 'ai_agent' || org === 'ent_agent') {
      //     if (!_isEqual(updatedData[org], originData[org])) {
      //       console.log('--changed props')
      //       console.log(org)
      //     }
      //   }
      // })

      this.updateMessage({ data: updatedData })
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
