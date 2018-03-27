<template>
  <div>
    <div class="header">
      <input
        type="text"
        placeholder="insert..."
        v-model="inputText"
      >
      <span @click="addRow" class="addBtn">Add</span>
    </div>

    <ul
      @click="rowClick($event)"
    >
       <li
          v-for="(key, idx) in data"
          :key="idx"
        >
          {{ data[idx]}}
          <span class="close">x</span>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'EditTableList',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      inputText: ''
    }
  },
  methods: {
    rowClick (evt) {
      const rowIndex = this.data.findIndex((data, idx) => {
        const startLength = evt.target.textContent.indexOf(data)
        // return evt.target.textContent.slice(startLength, dataLength + startLength)
        if (startLength > -1) {
          return true
        }
        return false
      })
      this.data.splice(rowIndex, 1)
    },
    addRow () {
      if (this.inputText.length) {
        this.data.push(this.inputText)
        this.inputText = ''
      }
    }
  }
  // mounted () {
  //   console.log('--mounted--')
  //   console.log(this.data)
  // }
}
</script>

<style scoped>
  ul {
  margin: 0;
  padding: 0;
}

/* Style the list items */
ul li {
  cursor: pointer;
  position: relative;
  padding: 12px 8px 12px 40px;
  list-style-type: none;
  background: #eee;
  font-size: 18px;
  transition: 0.2s;

  /* make the list items unselectable */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Set all odd list items to a different color (zebra-stripes) */
ul li:nth-child(odd) {
  background: #f9f9f9;
}

/* Darker background-color on hover */
ul li:hover {
  background: #ddd;
}

/* When clicked on, add a background color and strike out text */
ul li.checked {
  background: #888;
  color: #fff;
  text-decoration: line-through;
}

/* Add a "checked" mark when clicked on */
ul li.checked::before {
  content: '';
  position: absolute;
  border-color: #fff;
  border-style: solid;
  border-width: 0 2px 2px 0;
  top: 10px;
  left: 16px;
  transform: rotate(45deg);
  height: 15px;
  width: 7px;
}

/* Style the close button */
.close {
  position: absolute;
  right: 0;
  top: 0;
  padding: 12px 16px 12px 16px;
}

.close:hover {
  color: white;
}

/* Style the header */
.header {
  padding: 10px;
  background-color: #5597b4;
  opacity: 0.5;
  /* color: #5597b4; */
  text-align: center;
}

/* Clear floats after the header */
.header:after {
  content: "";
  display: table;
  clear: both;
}

/* Style the input */
input {
  border: none;
  width: 75%;
  padding: 10px;
  float: left;
  font-size: 16px;
}

/* Style the "Add" button */
.addBtn {
  padding: 10px;
  width: 25%;
  background: #d9d9d9;
  color: #555;
  float: left;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.addBtn:hover {
  background-color: #bbb;
}
</style>
