<template>
  <div :id="compId">
    <button class="accordion">{{ sectionTitle }}</button>
    <div class="panel">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Accordion',
  props: {
    sectionTitle: {
      type: String,
      default: () => 'Section',
      required: true
    },
    eventBus: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      compId: null,
      id: null,
      accordionElem: null
    }
  },
  methods: {
    handleDisplay (elem, status) {
      elem.classList.toggle('active')
      const panel = elem.nextElementSibling
      // for slide transition
      // if (panel.style.maxHeight) {
      //   panel.style.maxHeight = null
      // } else {
      //   panel.style.maxHeight = panel.scrollHeight + 'px'
      // }
      // toggle
      if (!status) {
        if (panel.style.display === 'block') {
          panel.style.display = 'none'
        } else {
          panel.style.display = 'block'
        }
      } else {
        if (status) {
          panel.style.display = 'block'
        } else {
          panel.style.display = 'none'
        }
      }
    }
  },
  beforeMount () {
    this.compId = this._uid
  },
  mounted () {
    this.accordionElem = this.$el.getElementsByClassName('accordion')
    if (this.accordionElem) {
      for (let i = 0; i < this.accordionElem.length; i += 1) {
        this.accordionElem[i].addEventListener('click', () => this.handleDisplay(this.accordionElem[i]), true)
      }
    }
  },
  beforeDestroy () {
    if (this.accordionElem) {
      for (let i = 0; i < this.accordionElem.length; i += 1) {
        this.accordionElem[i].removeEventListener('click', () => this.handleDisplay(this.accordionElem[i]), true)
      }
    }
  }
}
</script>

<style scoped>
.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}

.active, .accordion:hover {
  background-color: #ccc;
}

.accordion:after {
  content: '\02795'; /* Unicode character for "plus" sign (+) */
  font-size: 13px;
  color: #777;
  float: right;
  margin-left: 5px;
}

.active:after {
    content: "\2796"; /* Unicode character for "minus" sign (-) */
}

.panel {
  padding: 0 18px;
  background-color: white;
  /* max-height: 0; */
  display: none;
  overflow: auto;
  transition: max-height 0.2s ease-out;
}
</style>
