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
// import _isEqual from 'lodash.isequal'
import { mapActions, mapGetters } from 'vuex'
// import _isEqual from 'lodash.isequal'

import GridTable from '@/components/GridTable'

export default {
  name: 'Home',
  components: {
    GridTable
  },
  data () {
    return {
      isLoadBusy: false,
      columns: ['pk', 'message', 'ai_intent', 'intent', 'ai_entity', 'entity', 'check_status', 'skip'],
      gridData: this.getMessages(),
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
      if (!result) {
        // TODO error handleing
      }

      this.isLoadBusy = false
    },
    updateData (updatedData, originData) {
      // const changedProps = this.checkChangeProps(updatedData, originData)
      this.updateMessage({ originData, updatedData })
    }
    // checkChangeProps (updatedData, originData) {
    //   const updatedKeys = Object.keys(updatedData)
    //     .filter(key => key === 'entity' || key === 'intent')

    //   const updatedProps = []
    //   updatedKeys.forEach((key) => {
    //     if (updatedData[key].length) {
    //       if (!_isEqual(originData[key], updatedData[key])) {
    //         updatedProps.push(key)
    //       }
    //     } else {
    //       if (originData[key] && originData[key].length) {
    //         if (!_isEqual(originData[key], updatedData[key])) {
    //           updatedProps.push(key)
    //         }
    //       }
    //     }
    //   })
    //   return updatedProps
    // }
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
