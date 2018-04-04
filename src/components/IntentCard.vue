<template>
  <div class="card">
    <!-- <img src="img_avatar.png" alt="Avatar"> -->
    <header class="card__container header">
      <button
        v-if="deleteIntent"
        @click="clickDelete"> delete
      </button>
      <h3>{{ data.text }}</h3>
    </header>
  </div>
</template>

<script>
export default {
  name: 'IntentCard',
  props: {
    data: {
      type: [String, Object],
      default: () => {}
    },
    deleteIntent: {
      type: Function,
      default: null
    }
  },
  methods: {
    clickDelete () {
      this.deleteIntent(this.data)
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
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
</style>
