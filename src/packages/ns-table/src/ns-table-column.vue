<template>
  <span>
    <template v-for="(column,columnIndex) in columnList">
      <template v-if="column.children&&column.children.length">
        <column :column-option="column" :key="columnIndex"></column>
      </template>
      <template v-else>
        <el-table-column
          v-if="typeof column.show==='undefined'||column.show"
          :key="columnIndex"
          :column-key="column.columnKey"
          :resizable="column.resizable"
          :filter-method="column.filterMethod"
          :filtered-value="column.filteredValue"
        >
          <template slot="header">
            <span v-if="column.headerSlotName">
              <slot :name="column.headerSlotName" :row="column" />
            </span>
            <span v-else>{{column.label}}</span>
          </template>
          <template slot-scope="scope">
            <span v-if="column.filter">{{ Vue.filter(column['filter'])(scope.row[column.prop]) }}</span>
            <span v-else-if="column.slotName">
              <slot :name="column.slotName" :row="scope.row" :$index="scope.$index" />
            </span>
            <template v-else-if="column.formatter">
              <span v-html="column.formatter(scope.row,scope.row[column.prop]) " />
            </template>
            <span v-else>{{scope.row[column.prop]}}</span>
          </template>
        </el-table-column>
      </template>
    </template>
  </span>
</template>

<script>
import { getInternationalValue } from './../../utils'
import Column from './column'
export default {
  name: 'NsTableColumn',
  inject: ['table'],
  components: { Column },
  provide() {
    return {
      tableColumn: this
    }
  },
  props: {
    columnList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  methods: {
    getInternationalValue
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  update() {}
}
</script>

<style lang='scss' scoped>
</style>
