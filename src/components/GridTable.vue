<template>
  <div class="grid">
    <table>

      <thead id="tableHead">
        <tr>
          <th
            v-for="key in columns"
            :key="key"
            @click="sortBy(key)"
            :class="`th__row__${key}`">
            <!-- :class="{ active: sortKey == key }"> -->
            {{ key }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
            </span>
          </th>
        </tr>
      </thead>

      <tbody
        :style="tbodyStyle"
        id="tableBody"
      >
        <tr
          v-for="(entry, idx) in bindData"
          :key="entry.pk"
          v-on:click="clickMessage(entry, idx)"
        >
          <td
            v-for="key in columns"
            :key="key"
            :class="`td__row__${key}`"
          >
            <table-content
              :data="entry[key]"
            >
              </table-content>
          </td>
          <!-- <edit-table
            v-if="selected.data ? selected.data.pk === entry.pk : false"
            :handleCallback="handleCallback"
            :data="selected.data"
          >
            </edit-table> -->
        </tr>
      </tbody>
      <spinner v-if="isLoadBusy"></spinner>

    </table>
    <modal-comp
      v-if="showModal"
      :showModal="showModal"
      :handleCallback="handleCallback"
      :data="selectedData"
    ></modal-comp>
  </div>
</template>

<script>
import _throttle from 'lodash.throttle'
import ModalComp from '@/components/ModalComp'
import Spinner from '@/components/UI/Spinner'
import TableContent from '@/components/UI/TableContent'
// import ToolTip from '@/components/UI/ToolTip'

export default {
  name: 'GridTable',
  components: {
    ModalComp,
    Spinner,
    TableContent
    // ToolTip
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
    },
    updateData: {
      type: Function,
      default: () => {}
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
      selectedData: [],
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
    // filteredData: function () {
    //   var sortKey = this.sortKey
    //   var filterKey = this.filterKey && this.filterKey.toLowerCase()
    //   var order = this.sortOrders[sortKey] || 1
    //   var data = this.data
    //   if (filterKey) {
    //     data = data.filter(function (row) {
    //       return Object.keys(row).some(function (key) {
    //         return String(row[key]).toLowerCase().indexOf(filterKey) > -1
    //       })
    //     })
    //   }
    //   if (sortKey) {
    //     data = data.slice().sort(function (a, b) {
    //       a = a[sortKey]
    //       b = b[sortKey]
    //       return (a === b ? 0 : a > b ? 1 : -1) * order
    //     })
    //   }
    //   return data
    // },
    bindData () {
      return [ ...this.data ]
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
    // contentsHover (entry, index) {
    //   console.log('---contentsHover---')
    //   console.log(entry)
    // },
    // handleModal (entry) {
    //   if (entry) {
    //     this.selectedData = entry
    //   } else {
    //     this.selectedData = null
    //   }
    //   this.showModal = !this.showModal
    // },
    setSelected (to, idx, isSave) {
      this.selectedData = to
      if (isSave) {
        this.bindData.splice(idx, 1, to)
      }
      this.selected.index = idx
      this.showModal = !this.showModal
    },
    clickMessage (entry, idx) {
      this.setSelected(entry, idx)
    },
    handleCallback (entry, isSave, originData) {
      if (isSave) {
        // console.log(entry)
        // to lock or unlock
        this.setSelected(entry, this.selected.index, isSave)
        this.updateData(entry, originData)
      } else {
        this.setSelected(null, this.selected.index)
      }
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
    border: 0.5px solid #5597b4;
    border-radius: 1.5px;
    border-collapse: collapse;
    background-color: #fff;

    tr {
      display: block;
      width: 100%;
      cursor: pointer;
      table-layout: fixed;
      border: 0.2px solid #5597b4;
      border-collapse: collapse;
      padding: 5px;
    }

    td {
      display: inline-block;
      // height: var(--thead-height);
      // line-height: var(--thead-height);
      // padding: 0px 10px;
      // vertical-align: middle;

      // table-layout: fixed;
      // white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      // font-size: 12px;
    }

    thead {
      th {
        display: inline-block;
        height: var(--thead-height);
        line-height: var(--thead-height);

        table-layout: fixed;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        font-size: 12px;
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
      // tr:hover {
      //   background: black;
      // }
    }

    .th__row__pk {
      text-align: center;
      width: 5%;
    }
    .th__row__message {
      text-align: center;
      width: 17%;
    }
    .th__row__ai_intent {
      text-align: center;
      width: 17%;
    }
    .th__row__ai_entity {
      text-align: center;
      width: 17%;
    }
    .th__row__entity {
      text-align: center;
      width: 17%;
    }
    .th__row__intent {
      text-align: center;
      width: 17%;
    }
    .th__row__check_status {
      text-align: center;
      width: 5%;
    }
    .th__row__skip {
      text-align: center;
      width: 5%;
    }

    .td__row__pk {
      text-align: left;
      width: 5%;
    }
    .td__row__message {
      text-align: left;
      width: 17%;
    }
    .td__row__ai_intent {
      text-align: left;
      width: 17%;
    }
    .td__row__ai_entity {
      text-align: left;
      width: 17%;
    }
    .td__row__entity {
      text-align: left;
      width: 17%;
    }
    .td__row__intent {
      text-align: left;
      width: 17%;
    }
    .td__row__check_status {
      text-align: center;
      width: 5%;
    }
    .td__row__skip {
      text-align: center;
      width: 5%;
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
