<template>
  <div class="card">
    <!-- <img src="img_avatar.png" alt="Avatar"> -->
    <header class="card__container header">
      <button
        v-if="deleteEntity"
        @click="clickDelete"> delete
      </button>
    </header>

    <div class="card__container container">
      <p
        class="card-text"
        v-for="(entry, idx) in entityProps"
        :key="idx"
      >
        {{ entry }} : {{ getEntityValue(data, entry) }}
      </p>
      <div
        v-if="isCategory"
      >
        SubCategory: <select class="select" v-model="subCategoryValue">
          <option
            v-for="(entry, idx) in subCategoryOptions"
            :key="idx"
            :data="entry"
          > {{ subCategoryOptions[idx] }}
          </option>
        </select>
      </div>
    </div>

    <!-- <footer class="card__container footer">
      <h5>Footer</h5>
    </footer> -->
  </div>
</template>

<script>
import categoryList from '@/api/ant/category.json'

export default {
  name: 'EntityCard',
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    getEntityValue: {
      type: Function,
      default: () => ''
    },
    isCategory: {
      type: Boolean,
      default: () => false
    },
    deleteEntity: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      subCategoryOptions: [],
      entityProps: [],
      subCategoryValue: null
    }
  },
  methods: {
    clickDelete () {
      this.deleteEntity(this.data)
    }
  },
  mounted () {
    this.entityProps = Object.keys(this.data)
    this.subCategoryValue = this.data.subCategoryValue
    this.subCategoryOptions = categoryList.category[this.data.category]
  },
  watch: {
    subCategoryValue (newVal) {
      this.data.subCategoryValue = newVal
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 30%;
  margin: 5px;
  padding: 5px;
  background-color: #eee;
  border: 1px solid;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;

  .card__container {
    padding: 0.01em 16px;
  }

  /* Add some padding inside the card container */
  .card__container .container {
    min-width: 200px;
    padding: 2px 16px;
    background-color: white;
  }
  .card__container .header {
    background-color: #f1f1f1;
  }

  .card__container .footer {
    background-color: #616161;
  }

  .select {
    width: 90%;
  }
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
</style>
