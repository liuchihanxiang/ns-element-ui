<!-- v-loading.lock="loading" -->
<template>
  <div class="ns-table ns-table-container">
    <!-- 查询表单 -->
    <div :class="{'header_wraps':true,'header_wraps-inline':!btnListAlone}">
      <ns-form class="form_wraps"
        ref="serchForm"
        type="searchForm"
        v-if="formList.length"
        v-model="searchFormModel"
        :is-international="realIsInternational"
        :form-list="formList"
        :mixins="getDefaultVal(formOption.mixins,true)"
        :label-position="formOption.labelPosition"
        :label-width="formOption.labelWidth || 0"
        :label-suffix="formOption.labelSuffix"
        :status-icon="formOption.statusIcon"
        :clearable="getDefaultVal(formOption.clearable,true)"
        :inline-message="formOption.inlineMessage"
        :inline="formOption.inline"
        :disabled="formOption.disabled"
        :size="formOption.size"
        :submit-loading="loading"
        :search-btn="formOption.searchBtn"
        :reset-btn="formOption.resetBtn"
        :handler-submit="handlerSearch">
        <template slot="extraBtn">
          <slot name="searchBtn" />
        </template>
      </ns-form>
      <slot name="btnList">
        <div v-if="btnList.length"
          class="btn_wraps">
          <div class="pull-left">
            <template v-for="(btnItem,btnIndex) in btnList">
              <template v-if="!btnItem.position||btnItem.position==='left'">
                <template v-if="btnItem.code&&permit">
                  <el-button v-if="permit(btnItem.code)&&(btnItem.show === undefined || btnItem.show)"
                    :key="btnIndex"
                    :disabled="btnItem.disabled"
                    :class="btnItem.class"
                    @click="btnItem.click?btnItem.click(btnItem.code):''"
                    :type="btnItem.type?btnItem.type:'primary'">{{getInternationalValue(permit(btnItem.code))}}
                  </el-button>
                </template>
                <template v-else>
                  <el-button v-if="btnItem.text&&(btnItem.show===undefined || btnItem.show)"
                    :key="btnIndex"
                    :disabled="btnItem.disabled"
                    :class="btnItem.class"
                    @click="btnItem.click?btnItem.click(btnItem.code):''"
                    :type="btnItem.type?btnItem.type:'primary'">{{getInternationalValue(btnItem.text)}}</el-button>
                </template>
              </template>
            </template>
          </div>
          <div class="pull-right">
            <template v-for="(btnItem,btnIndex) in btnList">
              <template v-if="btnItem.position==='right'">
                <template v-if="btnItem.code&&permit">
                  <el-button v-if="permit(btnItem.code)&&(btnItem.show===undefined || btnItem.show)"
                    :key="btnIndex"
                    :disabled="btnItem.disabled"
                    :class="btnItem.class"
                    @click="btnItem.click?btnItem.click(btnItem.code):''"
                    :type="btnItem.type?btnItem.type:'primary'">{{getInternationalValue(permit(btnItem.code))}}
                  </el-button>
                </template>
                <template v-else>
                  <el-button v-if="btnItem.text&&(btnItem.show===undefined || btnItem.show)"
                    :key="btnIndex"
                    :disabled="btnItem.disabled"
                    :class="btnItem.class"
                    @click="btnItem.click?btnItem.click(btnItem.code):''"
                    :type="btnItem.type?btnItem.type:'primary'">{{getInternationalValue(btnItem.text)}}</el-button>
                </template>
              </template>
            </template>
          </div>
        </div>
      </slot>
    </div>
    <!-- 选中数据显示条数 -->
    <el-collapse-transition>
      <el-alert v-if="selection.length&&showSelectTips"
        :closable="false"
        class="alert-selection-tips"
        type="success"> 当前已选{{selection.length}}条数据 <el-button type="text"
          size="mini"
          @click="clearSelect">清空所选</el-button>
        <slot name="selectionContent" />
      </el-alert>
    </el-collapse-transition>
    <!-- 表格 -->
    <el-table ref="elBaseTable"
      class="ns-base-table"
      :data-id="tableId"
      element-loading-text="拼命加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="currentData"
      :height="height"
      :max-height="maxHeight"
      :stripe="stripe"
      :border="border"
      :lazy="lazy"
      :size="size"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="currentRowKey"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
      :cell-class-name="cellClassName"
      :cell-style="cellStyle"
      :header-row-style="headerRowStyle"
      :header-row-class-name="headerRowClassName"
      :header-cell-style="headerCellStyle"
      :row-key="rowKey"
      :empty-text="empyText"
      :load="treeLoad"
      :default-expand-all="defautExpandAll"
      :default-sort="defaultSort"
      :tooltip-effect="tooltipEffect"
      :summary-method="summaryMethod"
      :span-method="spanMethod"
      :select-on-indeterminate="selectOnIndeterminate"
      :tree-props="treeProps"
      style="width: 100%"
      @select="(selection, row) => emitEventHandler('select', selection, row)"
      @select-all="selection => emitEventHandler('select-all', selection)"
      @selection-change="selection => selectionChange(selection)"
      @cell-mouse-enter="(row, column, cell, event) => emitEventHandler('cell-mouse-enter', row, column, cell, event)"
      @cell-mouse-leave="(row, column, cell, event) => emitEventHandler('cell-mouse-leave', row, column, cell, event)"
      @cell-click="(row, column, cell, event) => emitEventHandler('cell-click', row, column, cell, event)"
      @cell-dblclick="(row, column, cell, event) => emitEventHandler('cell-dblclick', row, column, cell, event)"
      @row-click="(row, column, cell, event) => emitEventHandler('row-click', row, column, cell, event)"
      @row-dblclick="(row, event) => emitEventHandler('row-dblclick', row, event)"
      @row-contextmenu="(row, event) => emitEventHandler('row-contextmenu', row, event)"
      @header-click="(column, event) => emitEventHandler('header-click', column, event)"
      @sort-change="args => emitEventHandler('sort-change', args)"
      @filter-change="filters => emitEventHandler('filter-change', filters)"
      @current-change="(currentRow, oldCurrentRow) => emitEventHandler('current-change', currentRow, oldCurrentRow)"
      @header-dragend="(newWidth, oldWidth, column, event) => emitEventHandler('header-dragend', newWidth, oldWidth, column, event)"
      @expand-change="(row, expanded) => emitEventHandler('expand-change', row, expanded)">
      <!-- 多选 -->
      <el-table-column v-if="columns[0].type&&type.indexOf(columns[0].type)>=0"
        :align="columns[0].align?columns[0].align:'left'"
        :header-align="columns[0].headerAlign?columns[0].align:'left'"
        :class-name="(columns[0].className||'')+' el-table-checkbox' "
        :type="columns[0].type"
        :label="getInternationalValue(columns[0].label)"
        :reserve-selection="getDefaultVal(columns[0].reserveSelection,true)"
        :width="columns[0].width?columns[0].width:50" />
      <!-- 单选 -->
      <el-table-column :class-name="(columns[0].className||'')+' el-table-checkbox' "
        v-if="columns[0].type==='radio'"
        :width="columns[0].width?columns[0].width:50">
        <template slot-scope="scope">
          <el-radio v-model="radio"
            :label="scope.$index">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <!-- 正常显示列 -->
      <template v-for="(column,columnIndex) in filterColumns">
        <template v-if="column.children&&column.children.length">
          <column :column-option="column"
            :key="columnIndex"></column>
        </template>
        <template v-else>
          <el-table-column v-if="(typeof column.show==='undefined'||column.show)&&!column.type"
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
            :align="column.align||'left'"
            :header-align="column.headerAlign||'left'"
            :class-name="column.className"
            :label-class-name="column.labelClassName"
            :selectable="column.selectable"
            :filters="column.filters"
            :filter-placement="column.filterPlacement"
            :filter-multiple="column.filterMultiple"
            :filter-method="column.filterMethod"
            :filtered-value="column.filteredValue">
            <template slot="header">
              <span v-if="column.headerSlotName">
                <slot :name="column.headerSlotName"
                  :row="column" />
              </span>
              <span v-else>{{column.label}}</span>
            </template>
            <template slot-scope="scope">
              <span v-if="column.filter">{{ Vue.filter(column['filter'])(scope.row[column.prop]) }}</span>
              <span v-else-if="column.slotName">
                <slot :name="column.slotName"
                  :row="scope.row"
                  :$index="scope.$index" />
              </span>
              <template v-else-if="column.formatter">
                <span v-html="column.formatter(scope.row,scope.row[column.prop]) " />
              </template>
              <span v-else>{{scope.row[column.prop]}}</span>
            </template>
          </el-table-column>
        </template>
      </template>
      <!-- 表格操作列 -->
      <el-table-column :fixed="realOperationsConfig.fixed"
        :label="getInternationalValue(realOperationsConfig.title)"
        :width="realOperationsConfig.width"
        :min-width="realOperationsConfig.minWidth"
        :align="realOperationsConfig.align"
        v-if="operations&&operations instanceof Array&&operations.length"
        :class-name="realOperationsConfig.className">
        <template slot-scope="scope">
          <table-operations :row="scope.row"
            :row-index="scope.$index"></table-operations>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格分页 -->
    <div v-if="pagination"
      style="margin-top: 10px;text-align: right;">
      <el-pagination background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageList"
        :page-size="pageSize"
        :layout="paginationLayout"
        :total="total" />
    </div>
  </div>
</template>

<script>
import { tableProps } from './props'
import Column from './column'
import TableOperations from './operations'
import tableMixins from './mixins.js'
import NsForm from '../../ns-form/src/index.vue'
import { isEmptyObject, getDefaultVal } from './../../../utils/index'
import commonTable from '../../core/table'
export default {
  components: { NsForm, TableOperations, Column },
  name: 'NsTable',
  mixins: [tableMixins, commonTable],
  props: tableProps,
  data() {
    return {
      loading: false,
      type: ['selection', 'index', 'expand'],
      radio: false,
      tableId: new Date().getTime()
    }
  },
  methods: {
    getDefaultVal,
    isEmptyObject,
    emitEventHandler(event) {
      this.$emit(event, ...Array.from(arguments).splice(1))
    },

    // 过滤数据
    filterData() {
      const serchFormKeyList = Object.keys(this.searchFormModel)
      const searchFormListKey = serchFormKeyList.filter((key) => this.searchFormModel[key] !== '')
      if (!searchFormListKey.length) {
        this.currentData = JSON.parse(JSON.stringify(this.cachData))
      } else {
        let data = JSON.parse(JSON.stringify(this.cachData))
        if (this.treeTable) {
          this.currentData = this.treeFilter(this.filterTree(data, searchFormListKey))
        } else {
          this.currentData = data.filter((item) => {
            return this.isIncludesObj(item, searchFormListKey)
          })
        }
      }
    },

    isIncludesObj(obj, keyList) {
      return keyList.every((key) => {
        let val = this.searchFormModel[key]
        const itemVal = obj[key]
        return itemVal && itemVal.includes(val)
      })
    },
    isNeedBranch(item, keyList) {
      let flag1 = false
      let flag2 = false
      if (this.isIncludesObj(item, keyList)) {
        flag1 = true
      } else if (item.children && item.children.length) {
        item.children.forEach((child) => {
          if (this.isNeedBranch(child, keyList)) {
            flag2 = true
          }
        })
      }
      return flag1 || flag2
    },

    filterTree(data, keyList) {
      return data.map((item) => {
        item.isNeed = this.isNeedBranch(item, keyList)
        if (item.children && item.children.length) {
          this.filterTree(item.children, keyList)
        }
        return item
      })
    },

    treeFilter(data) {
      return data.filter((item, index) => {
        if (item && item.children && item.children.length) {
          item.children = this.treeFilter(item.children)
        }
        return item.isNeed
      })
    },
    delSelection(ids) {
      if (!Array.isArray(ids)) {
        ids = [ids]
      }
      for (let i = 0; i < this.selection.length; i++) {
        let item = this.selection[i]
        if (ids.includes(item[this.uniqueId])) {
          this.selection.splice(i, 1)
          i--
        }
      }
    }
  },
  computed: {
    filterColumns() {
      return this.columns.filter((item) => {
        const show = item.show
        if (!show) {
          return true
        } else if (show && typeof show === 'string') {
          return eval(judgesObj) /*eslint-disable-line*/
        } else if (Object.prototype.toString.call(show) === '[object Function]') {
          return show(item)
        } else if (typeof show === 'boolean') {
          return show
        } else {
          return true
        }
      })
    }
  }
}
</script>
