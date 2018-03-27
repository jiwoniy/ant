<template>
  <div class="grid">
    <table>

      <thead id="tableHead">
        <tr>
          <td
            v-for="key in columns"
            :key="key"
            @click="sortBy(key)"
            :class="`th__row__${key}`">
            <!-- :class="{ active: sortKey == key }"> -->
            {{ key }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
            </span>
          </td>
        </tr>
      </thead>

      <tbody :style="tbodyStyle" id="tableBody">
        <tr
          v-for="(entry, idx) in filteredData"
          :key="entry.pk"
          v-on:click="clickMessage(entry, idx)"
        >
          <td
            v-for="key in columns"
            :key="key"
            :class="`td__row__${key}`"
          >
            {{ entry[key] }}
          </td>
          <edit-table
            v-if="selected.data ? selected.data.pk === entry.pk : false"
            :handleCallback="handleCallback"
            :data="selected.data"
          >
            </edit-table>
        </tr>
      </tbody>
      <spinner v-if="isLoadBusy"></spinner>

    </table>
    <!-- <modal-comp
      :showModal="showModal"
      :handleModal="handleModal"
      :data="selectedData"
    ></modal-comp> -->
  </div>
</template>

<script>
import _throttle from 'lodash.throttle'
import ModalComp from '@/components/ModalComp'
import Spinner from '@/components/UI/Spinner'
import EditTable from '@/components/EditTable'

export default {
  name: 'GridTable',
  components: {
    ModalComp,
    Spinner,
    EditTable
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    filterKey: {
      type: String
    },
    loadMore: {
      type: Function,
      default: () => {}
    },
    isLoadBusy: {
      type: Boolean,
      default: () => false
    }
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
      selected: {
        data: null,
        index: null
      },
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
    // handleModal (entry) {
    //   if (entry) {
    //     this.selectedData = entry
    //   } else {
    //     this.selectedData = null
    //   }
    //   this.showModal = !this.showModal
    // },
    setSelected (from, to, idx) {
      // console.log(`seleted index: ${idx}`)
      // console.log(from)
      // console.log(to)
      this.selected.data = to
      this.selected.index = idx
    },
    clickMessage (entry, idx) {
      this.setSelected(null, entry, idx)
    },
    handleCallback (entry, isSave) {
      if (isSave) {
        console.log(`isSave: ${isSave}`)
        // TODO
        // status: true ===> save
        // check data is change or unchange
        this.data[this.selected.index] = entry
        // to lock or unlock
      }
      this.setSelected(this.selected.data, null, null)
    },
    handleScroll () {
      if (this.scrollElement.scrollTop + this.scrollElement.offsetHeight >= this.scrollElement.scrollHeight) {
        this.loadMore()
      }
    }
  },
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
  width: 100%;
  --thead-height: 50px;
  --grid-padding: 10px;
  padding: var(--grid-padding);
  height: calc(100% - var(--to-menu-height) - (var(--to-menu-padding) * 2));

  table {
    width: 100%;
    overflow-x: auto;
    table-layout: fixed;
    border: 0.5px solid #42b983;
    border-radius: 1.5px;
    border-collapse: collapse;
    background-color: #fff;

    tr {
      display: block;
      width: 100%;
      cursor: pointer;
    }

    th, td {
      display: inline-block;
      height: var(--thead-height);
      line-height: var(--thead-height);
      padding: 0px 10px;
      // vertical-align: middle;

      table-layout: fixed;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border: 0.2px solid #42b983;

      font-size: 12px;
    }

    thead {
      th {
        text-align: center;
      }

      th.active {
        color: #fff;
      }

      th.active .arrow {
        opacity: 1;
      }
    }

    tbody, thead {
      width: 100%;
      overflow: scroll;
      display: flex;
      flex-direction: column;

      tr:nth-child(odd) {
        background: #eee;
      }
    }

    .th__row__pk {
      text-align: center;
      width: 5%;
    }
    .th__row__message {
      text-align: center;
      width: 19%;
    }
    .th__row__ai_intent {
      text-align: center;
      width: 19%;
    }
    .th__row__ai_agent {
      text-align: center;
      width: 19%;
    }
    .th__row__ent_ai {
      text-align: center;
      width: 19%;
    }
    .th__row__ent_ag {
      text-align: center;
      width: 19%;
    }

    .td__row__pk {
      text-align: left;
      width: 5%;
    }
    .td__row__message {
      text-align: left;
      width: 19%;
    }
    .td__row__ai_intent {
      text-align: left;
      width: 19%;
    }
    .td__row__ai_agent {
      text-align: left;
      width: 19%;
    }
    .td__row__ent_ai {
      text-align: left;
      width: 19%;
    }
    .td__row__ent_ag {
      text-align: left;
      width: 19%;
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
