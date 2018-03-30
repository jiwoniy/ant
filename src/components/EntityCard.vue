<template>
  <div class="card">
    <!-- <img src="img_avatar.png" alt="Avatar"> -->
    <header class="card__container header">
      <h3>Entity</h3>
    </header>

    <div class="card__container container">
      <p class="card-text">
        Sentence: {{ data.sentence }}
      </p>
      <p class="card-text">
        Category: {{ data.category }}
      </p>
      SubCategory: <select>
        <option
          v-for="(entry, idx) in subCategoryOptions"
            :key="idx"
            :data="entry"
        > {{ subCategoryOptions[idx] }}

        </option>
      </select>
    </div>

    <!-- <footer class="card__container footer">
      <h5>Footer</h5>
    </footer> -->
  </div>
</template>

<script>
import categoryList from '@/api/category.json'

export default {
  name: 'EntityCard',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      subCategoryOptions: []
    }
  },
  mounted () {
    console.log('---mounted---')
    console.log(this.data.category)
    console.log(categoryList.category[this.data.category])
    this.subCategoryOptions = categoryList.category[this.data.category]
    console.log(this.subCategoryOptions)
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 40%;
  margin: 10px;
  padding: 10px;
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
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
</style>
