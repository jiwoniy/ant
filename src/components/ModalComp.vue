<template>
  <transition v-if="showModal">
    <div class="modal-mask">
      <div class="modal-wrapper" v-on:click="clickModalWrapper">
        <div class="modal-container">

          <div class="modal-header">
            <h2> edit
              <!-- <b-badge>New</b-badge> -->
            </h2>
          </div>

          <div class="modal-body">
            <input
              id="messageInput"
              type="text"
              class="input__message"
              :value="bindData.message"
              disabled
            />

            <ui-accordion
              :sectionTitle="'ai intent'"
            >
              <p> 1 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </ui-accordion>

            <ui-accordion
              :sectionTitle="'ai agent'"
            >
              <p> 2 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </ui-accordion>
            <ui-accordion
              :sectionTitle="'entity ai'"
            >
              <p> 3 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </ui-accordion>

            <ui-accordion
              :sectionTitle="'entity agent'"
            >
              <div class="card--layout">
                <entity-card
                  v-for="(entry, idx) in entityList"
                  :key="idx"
                  :data="entry"
                >
                </entity-card>
              </div>
              <div class="button--layout">
                <!-- <b-button variant="success">Success</b-button>
                <b-button variant="info">Info</b-button>
                <b-button variant="warning">Warning</b-button>
                <b-button variant="primary">Primary</b-button>
                <b-button variant="danger">Danger</b-button>
                <b-button variant="link">Link</b-button> -->
                <button
                  v-for="(entry) in categoryList"
                  :key="entry"
                  :data="entry"
                  @click="selectCategory(entry)"
                >
                {{ entry }}
                </button>
              </div>
            </ui-accordion>
          </div>

          <div class="modal-footer">
            <b-button-group>
              <b-button @click.stop="closeModal"> OK </b-button>
              <b-button @click.stop="closeModal"> Cancel </b-button>
            </b-button-group>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import EntityCard from './EntityCard'
import UiAccordion from './UI/Accordion'

import categoryList from '@/api/category.json'

export default {
  name: 'ModalComp',
  components: {
    EntityCard,
    UiAccordion
  },
  props: {
    showModal: {
      type: Boolean,
      defalut: () => false,
      required: true
    },
    handleCallback: {
      type: Function,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      inputElement: null,
      entityList: [],
      categoryList: Object.keys(categoryList.category)
      // selectedMessage: null
    }
  },
  methods: {
    closeModal () {
      // TODO save or cancel
      this.handleCallback()
    },
    clickModalWrapper (event) {
      if (this.showModal) {
        if (event.target.className === 'modal-wrapper') {
          this.closeModal()
        }
      }
    },
    // selectMessage () {
    //   this.selectedMessage = window.getSelection().toString()
    // },
    selectCategory (category) {
      // console.log('----selectCategory----')
      // console.log(categoryList.category)
      // console.log(categoryList.category)
      const selectedMessage = window.getSelection().toString()
      if (category && selectedMessage) {
        this.entityList.push({
          sentence: selectedMessage,
          category
        })
      }
    }
  },
  computed: {
    bindData () {
      return {
        'ai_intent': this.data['ai_intent'] || [],
        'ent_ai': this.data['ent_ai'] || [],
        'ai_agt': this.data['ai_agt'] || [],
        'ent_agt': this.data['ent_agt'] || [],
        ...this.data
      }
    }
  },
  mounted () {
    console.log('---mounted---')
    // console.log(this.bindData)
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 90%;
  height: 85%;
  margin: 10px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  padding: 10px auto;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.input__message, select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.input__message {
  width: 100%;
  background-color: #4CAF50;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.card--layout {
  box-sizing: border-box;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
}

.button--layout {
  box-sizing: border-box;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
}
</style>
