<template>
  <div>
    <div
      v-if="dataType === 'string'"
    >
      {{ this.data }}
    </div>

    <div
      v-if="dataType === 'array'"
    >
      <sum-nail-card
        :data="entry"
        v-for="(entry, idx) in data"
        :key="idx"
      >
      </sum-nail-card>
    </div>

    <div
      v-if="dataType === 'object'"
    >
      <sum-nail-card
        :data="entry"
        v-for="(entry, idx) in data"
        :key="idx"
      >
      </sum-nail-card>
    </div>

  </div>
</template>

<script>
import SumNailCard from '@/components/UI/SumNailCard'
// import TableContent from '@/components/UI/TableContent'

export default {
  name: 'TableContent',
  components: {
    SumNailCard
  },
  props: {
    data: {
      type: [String, Number, Object, Array, Boolean],
      default: () => {}
    }
  },
  computed: {
    dataType () {
      const type = typeof this.data
      if (type === 'number' || type === 'string') {
        return 'string'
      } else if (type === 'object' && Array.isArray(this.data)) {
        return 'array'
      }
      return 'object'
    }
  }
}
</script>
