<template>
  <transition v-if="showModal">
    <div class="modal-mask">
      <div class="modal-wrapper" v-on:click="clickModalWrapper">
        <div class="modal-container">

          <div class="modal-header">
            <h3> Edit
              <b-badge>checkd</b-badge>
              <b-badge>review</b-badge>
            </h3>
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
              <div class="card--layout">
                <intent-card
                    v-for="(entry, idx) in bindData['ai_intent']"
                    :key="idx"
                    :data="entry"
                  >
                </intent-card>
              </div>
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
              <div class="card--layout">
                <entity-card
                  v-for="(entry, idx) in bindData['ent_ai']"
                  :key="idx"
                  :data="entry"
                  :getEntityValue="getEntityValue"
                >
                </entity-card>
              </div>
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
            <b-button-group @click.stop="closeModal">
              <b-button> OK </b-button>
              <b-button> Cancel </b-button>
            </b-button-group>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import _isEqualWith from 'lodash.isequalwith'
import _isEqual from 'lodash.isequal'

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
    }
  },
  methods: {
    toggle () {
      const accordionChildren = this.$children
      for (let i = 0; i < accordionChildren.length; i += 1) {
        accordionChildren[i].handleDisplay(accordionChildren[i].accordionElem[0])
      }
    },
    closeModal (event) {
      let userWantSave = false
      if (event) {
        if (event.target.textContent.indexOf('OK') > -1) {
          userWantSave = true
        }
      }

      const isUpdated = _isEqualWith(this.data, this.bindData, this.isUpdated)
      let isSave = false
      if (isUpdated && userWantSave) {
        // no problem save
        isSave = true
      } else if (isUpdated && !userWantSave) {
        const userConfirm = confirm('변경된 내용')
        isSave = userConfirm
      } else if (!isUpdated && userWantSave) {
        alert('변경된 내용이 없습니다.')
      }

      this.handleCallback(this.bindData, isSave)
    },
    clickModalWrapper (event) {
      if (this.showModal) {
        if (event.target.className === 'modal-wrapper') {
          // TODO alert!!!
          this.closeModal()
        }
      }
    },
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
      this.entityList = computedParentData['ent_ag']
      this.intentList = computedParentData['ai_agt']
    },
    isUpdated (origin, update) {
      // compare only "ai_agt", "ent_agt"
      const updated = Object.keys(update)

      const isUpdate = updated.some((org) => {
        if (org === 'ai_agt' || org === 'ent_ag') {
          if (update[org] === null || update[org].length === 0) {
            return false
          } else {
            return !_isEqual(origin[org], update[org])
          }
        }
        return false
      })

      // console.log(`isUpdate: ${isUpdate}`)
      return isUpdate
    }
  },
  computed: {
    bindData () {
      return {
        'ai_intent': this.data['ai_intent'] || [],
        'ent_ai': this.data['ent_ai'] || [],
        'ai_agt': this.data['ai_agt'] || [],
        'ent_ag': this.data['ent_ag'] || [],
        'pk': this.data.pk,
        'message': this.data.message
      }
    }
  },
  mounted () {
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
  height: 90%;
  margin: 2% auto;
  padding: 2%;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  overflow-y: auto;
}

.modal-header {
  margin: 5px;
}

.modal-body {
  /* height: calc(100% - 120px); */
  padding: 10px auto;
}

.modal-footer {
  margin: 5px;
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
