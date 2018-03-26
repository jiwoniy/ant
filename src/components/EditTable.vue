<template>
  <div class="edit">
    <input v-model="updateData.message" />
    <b-button-group>
      <b-button @click.stop="closeUpdate(true)"> OK </b-button>
      <b-button @click.stop="closeUpdate(false)"> Cancel </b-button>
    </b-button-group>
  </div>
</template>

<script>

export default {
  name: 'EditTable',
  props: {
    handleCallback: {
      type: Function,
      required: true
    },
    data: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {
    updateData () {
      return {
        ...this.data
      }
    }
  },
  methods: {
    closeUpdate (isSave) {
      // data
      if (isSave) {
        this.handleCallback(this.updateData, isSave)
      } else {
        this.handleCallback(this.data, isSave)
      }
    }
  }
  // mounted () {
  //   console.log('---mounted---')
  //   console.log(this.updateData)
  // }
}
</script>

<style scoped>
.edit {
  height: 300px;
}
</style>
