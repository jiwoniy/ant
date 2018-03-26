<template>
  <div
    class="wrapperStyle"
    :style="{ height: wrapperStyle.height }"
  >

    <header>
      <p> {{ dataset.message }}</p>
    </header>

    <section>
      <div class="tab">
        <button
          :class="[currentTab === 'Intent' ? ['tabLinks', 'tabLinks__active'] : ['tabLinks', 'tabLinks__none']]"
          @click="switchTab($event, 'Intent')">Intent</button>
        <button
          :class="[currentTab === 'Entity' ? ['tabLinks', 'tabLinks__active'] : ['tabLinks', 'tabLinks__none']]"
          @click="switchTab($event, 'Entity')">Entity</button>
      </div>

      <!-- <div class="contentsHeader">
        <button
          @click="addIntent($event)">
          add
        </button>
      </div> -->

      <div
        id="Intent"
        :class="[currentTab === 'Intent' ? ['tabContent', 'tabContent__active'] : ['tabContent', 'tabContent__none']]"
      >

        <!-- <div>
          <p
            v-for="(entry, idx) in dataset['ai_agent']"
            :key="idx"
          > {{ entry[idx] }}
          </p> -->

          <edit-table-list
            :data="dataset['ai_agent']"
          >
          </edit-table-list>
        <!-- </div> -->
      </div>

      <div
        id="Entity"
        :class="[currentTab === 'Entity' ? ['tabContent', 'tabContent__active'] : ['tabContent', 'tabContent__none']]"
      >
        <h3>Entity</h3>
        <p>Paris is the capital of France.</p>
      </div>

    </section>

    <footer>
      <b-button-group>
        <b-button @click.stop="closeUpdate(true)"> OK </b-button>
        <b-button @click.stop="closeUpdate(false)"> Cancel </b-button>
      </b-button-group>
    </footer>
  </div>
</template>

<script>
import EditTableList from './EditTableList'

export default {
  name: 'EditableList',
  components: {
    EditTableList
  },
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
  data () {
    return {
      wrapperStyle: {
        height: `${window.innerHeight / 2}px`
      },
      currentTab: 'Intent',
      dataset: {
        message: '',
        'ai_agent': [],
        'ai_intent': []
      }
    }
  },
  methods: {
    closeUpdate (isSave) {
      if (isSave) {
        this.handleCallback(this.dataset, isSave)
      } else {
        this.handleCallback(this.data, isSave)
      }
    },
    switchTab (evt, currentTab) {
      this.currentTab = currentTab
    }
    // addIntent (evt) {
    // console.log('--add Intent')
    // console.log(evt)
    // console.log(this.data)
    // }
  },
  mounted () {
    this.dataset.message = this.data.message || ''
    this.dataset['ai_intent'] = (this.data['ai_intent'] && this.data['ai_intent'].slice()) || []
    this.dataset['ai_agent'] = (this.data['ai_agent'] && this.data['ai_agent'].slice()) || []
  }
}
</script>

<style lang="scss" scoped>
.wrapperStyle {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // background-color: blue;

  header {
    margin: 2px 5px;
    flex: 0.15;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  section {
    flex: 0.7;
    .tab {
      overflow: hidden;
      border: 1px solid #ccc;
      background-color: #f1f1f1;
    }

    .tab button {
      float: left;
      border: none;
      outline: none;
      cursor: pointer;
      padding: 14px 16px;
      transition: 0.3s;
    }

    .tabLinks {
      display: block;
      background-color: #ccc;
    }

    .tabLinks__active {
      background-color: red;
    }

    .tabLinks__none {
      background-color: #ccc;
    }

    .tabContent {
      display: none;
      padding: 6px 12px;
      border: 1px solid #ccc;
      border-top: none;
    }

    .tabContent__active {
      display: block;
    }

    .tabContent__none {
      display: none;
    }

    .contentsHeader {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }

  footer {
    flex: 0.15;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>
