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
            <h4> {{ bindData.message }} </h4>
            <b-card no-body>
              <b-tabs card>
                <b-tab title="Intent" active>
                  Tab Contents 1
                </b-tab>
                <b-tab title="Entitiy">
                  Tab Contents 2
                </b-tab>
              </b-tabs>
            </b-card>
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
export default {
  name: 'ModalComp',
  props: {
    showModal: {
      type: Boolean,
      defalut: () => false,
      required: true
    },
    handleModal: {
      type: Function,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    closeModal () {
      // TODO save or cancel
      this.handleModal()
    },
    clickModalWrapper (event) {
      if (this.showModal) {
        if (event.target.className === 'modal-wrapper') {
          this.closeModal()
        }
      }
    }
  },
  computed: {
    bindData () {
      return {
        ...this.data
      }
    }
  }
  // mounted () {
  //   console.log('---ModalComp mounted')
  // }
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
  width: 80%;
  height: 80%;
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
</style>
