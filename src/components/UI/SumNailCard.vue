<template>
  <div class="card">
    {{ data }}
  </div>
</template>

<script>

export default {
  name: 'SumNailCard',
  props: {
    data: {
      type: [String, Number, Object, Array],
      default: () => {}
    }
  }
  // data () {
  //   return {
  //     entityProps: []
  //   }
  // },
  // mounted () {
  // }
}
</script>

<style lang="scss" scoped>
.card {
  // width: 100%;
  margin: 0px auto;
  padding: 5px;
  background-color: #eee;
  border: 1px solid;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}
</style>
