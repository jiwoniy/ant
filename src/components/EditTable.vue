<template>
  <div class="edit">
    <p> test </p>
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
    handleLock: {
      type: Function,
      required: true
    }
  },
  methods: {
    closeUpdate (isSave) {
      // data
      this.handleLock({}, isSave)
    }
  }
}
</script>

<style scoped>
.edit {
  height: 300px;
}
</style>
