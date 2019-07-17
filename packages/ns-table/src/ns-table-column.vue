<template>
  <span>
    <template v-for="(column,columnIndex) in columnList">
      <template v-if="column.children&&column.children.length">
        <el-table-column :label="column.label"
                         :key="columnIndex">
          <ns-table-column :columnList="column.children"
                           :treeCtrlIndex="treeCtrlIndex"
                           :treeTable="treeTable"
                           :collapsedIcon="collapsedIcon"
                           :expandedIcon="expandedIcon"
                           :showClomnuIndex="showClomnuIndex"
                           @toggleExpanded="toggleExpanded"
                           :treeChildrenKey="treeChildrenKey"></ns-table-column>
        </el-table-column>

      </template>
      <template v-else>
        <el-table-column v-if="!column.type&&showClomnuIndex.indexOf(columnIndex)!=-1&&(typeof column.show==='undefined'||column.show)"
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
                         :align="getAlignStyle(column.align,columnIndex)"
                         :header-align="getAlignStyle(column.headerAlign,columnIndex)"
                         :class-name="column.className"
                         :label-class-name="column.labelClassName"
                         :selectable='column.selectable'
                         :reserve-selection='column.reserveSelection'
                         :filters="column.filters"
                         :filter-placement="column.filterPlacement"
                         :filter-multiple="column.filterMultiple"
                         :filter-method="column.filterMethod"
                         :filtered-value="column.filteredValue">
          <template slot="header">
            <span v-if="column.headerSlotName">
              <slot :name='column.headerSlotName'
                    :row="column" />
            </span>
            <span v-else>{{column.label}}</span>
          </template>
          <template slot-scope="scope">
            <template v-if="treeTable">
              <template v-if="columnIndex === treeCtrlIndex">
                <span v-for="space in scope.row._level"
                      class="ms-tree-space"
                      :key="space" />
              </template>
              <span class="tree-ctrl"
                    v-if="iconShow(columnIndex,scope.row)"
                    @click="toggleExpanded(scope.$index,$event)">
                <i v-if="!scope.row._expanded"
                   :class="collapsedIcon" />
                <i v-else
                   :class="expandedIcon" />
              </span>
            </template>
            <span v-if="column.filter">
              {{ Vue.filter(column['filter'])(scope.row[column.prop]) }}
            </span>
            <span v-else-if="column.slotName">
              <slot :name="column.slotName"
                    :row="scope.row"
                    :$index="scope.$index" />
            </span>
            <!-- <span v-else-if="column.htmlFormatter">
                {{column.htmlFormatter(scope.row,scope.row[column.prop])}}
              </span> -->
            <template v-else-if="column.formatter">
              <span v-html="column.formatter(scope.row,scope.row[column.prop]) " />
            </template>
            <span v-else>{{scope.row[column.prop]}}</span>
          </template>
        </el-table-column>
      </template>
    </template>
    <!-- <ns-table-column :columnList="columns"
                       :treeCtrlIndex="treeCtrlIndex"
                       :treeTable="treeTable"
                       :collapsedIcon="collapsedIcon"
                       :expandedIcon="expandedIcon"
                       :showClomnuIndex="showClomnuIndex"
                       @toggleExpanded="toggleExpanded"
                       :treeChildrenKey="treeChildrenKey"></ns-table-column> -->
  </span>
</template>

<script>
import { getInternationalValue } from './../../utils'
export default {
  name: 'NsTableColumn',
  components: {

  },
  props: {
    treeCtrlIndex: Number,
    treeTable: Boolean,
    treeChildrenKey: String,
    columnList: Array,
    showClomnuIndex: Array,
    collapsedIcon: String,
    expandedIcon: String
  },
  data () {
    return {

    }
  },
  methods: {
    getInternationalValue,
    // 图标显示
    iconShow (index, record) {
      return (
        index === this.treeCtrlIndex &&
        record[this.treeChildrenKey] &&
        record[this.treeChildrenKey].length > 0
      )
    },
    toggleExpanded () {
      this.$emit('toggleExpanded', ...arguments)
    },
    getAlignStyle (align, columnIndex) {
      if (this.treeTable && !align) {
        return 'left'
      } else if (!this.treeTable && !align) {
        return 'center'
      } else {
        return align
      }
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  update () { }
}
</script>

<style lang='scss' scoped>
</style>
