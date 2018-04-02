<template>
  <div
    class="wrapperStyle"
  >
  <!-- :style="{ height: wrapperStyle.height }" -->
    <section>
      <div class="tab">
        <button
          :class="[currentTab === 'Intent' ? ['tabLinks', 'tabLinks__active'] : ['tabLinks', 'tabLinks__none']]"
          @click="switchTab($event, 'Intent')">Intent</button>
        <button
          :class="[currentTab === 'Entity' ? ['tabLinks', 'tabLinks__active'] : ['tabLinks', 'tabLinks__none']]"
          @click="switchTab($event, 'Entity')">Entity</button>
      </div>

      <div class="header">
        <p> Message:  {{ dataset.message }}</p>
        <ul v-if="currentTab === 'Intent'">
          <li
              v-for="(entry, idx) in dataset['ai_intent']"
              :key="idx"
            >
              {{ entry }}
            </li>
        </ul>

        <ul v-if="currentTab === 'Entity'">
          <li
              v-for="(entry, idx) in dataset['ent_ai']"
              :key="idx"
            >
              {{ entry }}
            </li>
        </ul>
      </div>

      <div
        id="Intent"
        :class="[currentTab === 'Intent' ? ['tabContent', 'tabContent__active'] : ['tabContent', 'tabContent__none']]"
      >
          <edit-table-list
            :data="dataset['ai_agent']"
          >
          </edit-table-list>
      </div>

      <div
        id="Entity"
        :class="[currentTab === 'Entity' ? ['tabContent', 'tabContent__active'] : ['tabContent', 'tabContent__none']]"
      >
        <h3>Entity</h3>
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
      // wrapperStyle: {
      //   height: `${window.innerHeight / 2}px`
      // },
      currentTab: 'Intent',
      dataset: {
        pk: null,
        message: '',
        'ai_agent': [],
        'ai_intent': [],
        'ent_ai': []
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
      console.log(this.currentTab)
      console.log(this.dataset)
    }
    // addIntent (evt) {
    // console.log('--add Intent')
    // console.log(evt)
    // console.log(this.data)
    // }
  },
  mounted () {
    this.dataset.pk = this.data.pk
    this.dataset.message = this.data.message || ''
    this.dataset['ai_intent'] = (this.data['ai_intent'] && this.data['ai_intent'].slice()) || []
    this.dataset['ai_agent'] = (this.data['ai_agent'] && this.data['ai_agent'].slice()) || []
    this.dataset['ent_ai'] = (this.data['ent_ai'] && this.data['ent_ai'].slice()) || []
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

  section {
    .header {
      // margin: 10px auto;
      // flex: 0.15;
      display: flex;
      flex-direction: column;
      font-weight: bold;

      justify-content: center;
      align-items: flex-start;
    }

    // flex: 0.7;
    .tab {
      overflow: hidden;
      border: 1px solid #ccc;
      background-color: #5597b4;
      opacity: 0.6;
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
      background-color: white;
    }

    .tabLinks__none {
      background-color: #5597b4;
      opacity: 1;
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
    // flex: 0.15;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>
