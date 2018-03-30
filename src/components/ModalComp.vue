<template>
  <transition v-if="showModal">
    <div class="modal-mask">
      <div class="modal-wrapper" v-on:click="clickModalWrapper">
        <div class="modal-container">

          <div class="modal-header">
            <h2> edit
              <!-- <b-badge>New</b-badge> -->
            </h2>
             <button @click="toggle">
              toggle
            </button>
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
              <intent-card
                  v-for="(entry, idx) in bindData['ai_intent']"
                  :key="idx"
                  :data="entry"
                >
              </intent-card>
            </ui-accordion>

            <ui-accordion
              :sectionTitle="'ai agent'"
            >
              <intent-card
                v-for="(entry, idx) in intentList"
                :key="idx"
                :data="entry"
              >
              </intent-card>
              <add-list
                :data="intentList"
              >
                </add-list>
            </ui-accordion>

            <ui-accordion
              :sectionTitle="'entity ai'"
            >
              <entity-card
                v-for="(entry, idx) in bindData['ent_ai']"
                :key="idx"
                :data="entry"
                :getEntityValue="getEntityValue"
              >
              </entity-card>
            </ui-accordion>

            <ui-accordion
              :sectionTitle="'entity agent'"
            >
              <div class="card--layout">
                <entity-card
                  v-for="(entry, idx) in entityList"
                  :key="idx"
                  :data="entry"
                  :getEntityValue="getEntityValue"
                  :isCategory="true"
                >
                </entity-card>
              </div>
              <div class="button--layout">
                <button
                  v-for="(entry) in categoryList"
                  :key="entry"
                  :data="entry"
                  @click="selectEntityCategory(entry)"
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
import IntentCard from './IntentCard'
import AddList from './AddList'
import UiAccordion from './UI/Accordion'

import categoryList from '@/api/category.json'

export default {
  name: 'ModalComp',
  components: {
    EntityCard,
    IntentCard,
    AddList,
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
      intentList: [],
      entityList: [],
      categoryList: Object.keys(categoryList.category),
      getEntityValue: (data, name) => data[name]
      // selectedMessage: null
    }
  },
  methods: {
    toggle () {
      const accordionChildren = this.$children
      for (let i = 0; i < accordionChildren.length; i += 1) {
        accordionChildren[i].handleDisplay(accordionChildren[i].accordionElem[0])
      }
    },
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
    selectEntityCategory (category) {
      const selectedMessage = window.getSelection().toString()
      if (category && selectedMessage) {
        this.entityList.push({
          sentence: selectedMessage,
          category
        })
      }
    },
    updateTwowayBinding (computedParentData) {
      // console.log('--updateTwowayBinding--')
      // console.log(computedParentData)
      this.entityList = computedParentData['ent_agt']
      this.intentList = computedParentData['ai_agt']
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
    // console.log('---mounted---')
    this.updateTwowayBinding(this.bindData)
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
