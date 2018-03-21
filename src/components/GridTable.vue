<template>
  <div class="grid">
    <table>

      <thead id="tableHead">
        <tr>
          <th
            v-for="key in columns"
            :key="key"
            @click="sortBy(key)"
            :class="{ active: sortKey == key }">
            {{ key | capitalize }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
            </span>
          </th>
        </tr>
      </thead>

      <tbody :style="tbodyStyle" id="tableBody">
        <tr
          v-for="entry in filteredData"
          :key="entry.id"
          v-on:click="handleModal"
        >
          <td
            v-for="key in columns"
            :key="key"
          >
            {{entry[key]}}
          </td>
        </tr>
      </tbody>

    </table>
    <modal-comp
      :showModal="showModal"
      :handleModal="handleModal"
    ></modal-comp>
  </div>
</template>

<script>
import _throttle from 'lodash.throttle'
import ModalComp from '@/components/ModalComp'

export default {
  name: 'GridTable',
  components: {
    ModalComp
  },
  props: {
    data: Array,
    columns: Array,
    filterKey: String,
    loadMore: Function
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      scrollElement: null,
      headerElement: null,
      showModal: false,
      tbodyStyle: {
        height: `${window.innerHeight - (10 * 2) - 60 - (5 * 2) - (10 * 2) - 50}px`
        // see App.vue css variable
        // height - (app margin * 2) - (top menu height) - (top menu padding) - (grid padding * 2) - (thed padding)
      },
      sortKey: '',
      sortOrders
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    handleModal () {
      this.showModal = !this.showModal
    },
    handleScroll () {
      if (this.scrollElement.scrollTop + this.scrollElement.offsetHeight >= this.scrollElement.scrollHeight) {
        this.loadMore()
      }
    }
  },
  // beforeMount () {
  //   console.log(document.getElementById('gridTable'))
  //   // document.getElementById('gridTable').addEventListener('scroll', _throttle(this.handleScroll, 250))
  // },
  mounted () {
    this.scrollElement = document.getElementById('tableBody')
    this.headerElement = document.getElementById('tableHead')
    if (this.scrollElement) {
      this.scrollElement.addEventListener('scroll', _throttle(this.handleScroll, 250), true)
    }
  },
  beforeDestroy () {
    if (this.scrollElement) {
      this.scrollElement.removeEventListener('scroll', this.handleScroll)
    }
  }
}
</script>

<style lang="scss" scoped>
.grid {
  --thead-height: 50px;
  --grid-padding: 10px;
  padding: var(--grid-padding);
  height: calc(100% - var(--to-menu-height) - (var(--to-menu-padding) * 2));

  table {
    border: 2px solid #42b983;
    border-radius: 3px;
    background-color: #fff;

    thead {
      th {
        height: var(--thead-height);
        background-color: #42b983;
        color: rgba(255,255,255,0.66);
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        min-width: 120px;
        padding: 10px 20px;
      }
    }

    tbody {
      display: block;
      overflow: auto;
      // height: calc(100% - var(--to-menu-height) - (var(--to-menu-padding) * 2) - (var(--grid-padding) * 2) - var(--thead-height));

      td {
        background-color: #f9f9f9;
      }

      th, td {
        min-width: 120px;
        padding: 10px 20px;
      }

      th.active {
        color: #fff;
      }

      th.active .arrow {
        opacity: 1;
      }
    }
  }

  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
  }

  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
  }

  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
  }
}
</style>
