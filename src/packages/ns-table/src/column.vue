<template>
  <el-table-column
    :label="columnOption.label"
    :align="columnOption.align||'center'"
    :header-align="columnOption.headerAlign||'center'"
  >
    <template v-for="(column,columnIndex) in columnOption.children">
      <template v-if="column.children&&column.children.length">
        <column :column-option="column" :key="columnIndex"></column>
      </template>
      <template v-else>
        <el-table-column
          v-if="typeof column.show==='undefined'||column.show"
          :key="columnIndex"
          :column-key="column.columnKey"
          :prop="column.prop"
          :label="getInternationalValue(column.label)"
          :width="column.width"
          :min-width="column.minWidth"
          :fixed="column.fixed"
          :render-header="column.renderHeader"
          :sortable="column.sortable"
          :sort-method="column.sortMethod"
          :resizable="column.resizable"
          :show-overflow-tooltip="typeof column.showOverflowTooltip==='undefined'?true:column.showOverflowTooltip"
          :align="column.align||'center'"
          :header-align="column.headerAlign||'center'"
          :class-name="column.className"
          :label-class-name="column.labelClassName"
          :selectable="column.selectable"
          :reserve-selection="column.reserveSelection"
          :filters="column.filters"
          :filter-placement="column.filterPlacement"
          :filter-multiple="column.filterMultiple"
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
              <span v-html="column.formatter(scope.row,scope.row[column.prop])" />
            </template>
            <span v-else>{{scope.row[column.prop]}}</span>
          </template>
        </el-table-column>
      </template>
    </template>
  </el-table-column>
</template>

<script>
import { getInternationalValue } from './../../../utils'
export default {
  name: 'Column',
  inject: ['table'],
  props: {
    columnOption: Object // eslint-disable-line
  },
  methods: {
    getInternationalValue
  }
}
</script>
