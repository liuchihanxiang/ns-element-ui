<template>
  <div class="ns-grid">
    <!-- 查询表单 -->
    <div :class="{'header_wraps':true,'header_wraps-inline':!btnListAlone}">
      <ns-form class="form_wraps"
        ref="serchForm"
        type="searchForm"
        v-if="formList.length"
        v-model="searchFormModel"
        :form-list="formList"
        :mixins="getDefaultVal(formOption.mixins,true)"
        :label-position="formOption.labelPosition"
        :label-width="formOption.labelWidth || 0"
        :label-suffix="formOption.labelSuffix"
        :status-icon="formOption.statusIcon"
        :inline-message="formOption.inlineMessage"
        :inline="formOption.inline"
        :disabled="formOption.disabled"
        :size="formOption.size"
        :submit-loading="loading"
        :search-btn="formOption.searchBtn"
        :reset-btn="formOption.resetBtn"
        :handler-submit="handlerSearch"
        @handlerReset="handlerReset">
        <template slot="extraBtn">
          <slot name="searchBtn" />
        </template>
      </ns-form>
      <slot name="btnList">
        <table-btns :btn-list="btnList"
          :permit="permit">
          <slot name="btnItem"></slot>
        </table-btns>
      </slot>
    </div>
    <!-- <vxe-toolbar custom></vxe-toolbar> -->
    <!-- 表格 -->
    <vxe-table ref="elBaseTable"
      stripe
      highlight-hover-row
      :data="currentData"
      v-bind="gridConfig"
      v-on="$listeners"
      class="ns-base-table">
      <!-- 正常显示列 -->
      <template v-for="(column,columnIndex) in tableColumns">
        <template v-if="column.children&&column.children.length">
          <vxe-column :column="column"
            :key="columnIndex"></vxe-column>
        </template>
        <template v-else>
          <vxe-table-column :key="columnIndex"
            v-bind="column">
            <template v-if="isSlot(column,column.field,'default')"
              v-slot:default="rowData">
              <slot v-bind="rowData"
                :name="`${column.field}`"></slot>
            </template>
            <template v-if="isSlot(column,`header`)"
              v-slot:header="rowData">
              <slot v-bind="rowData"
                :name="`${column.field}_header`"></slot>
            </template>
            <template v-if="isSlot(column,`content`)"
              v-slot:content="rowData">
              <slot v-bind="rowData"
                :name="`${column.field}_content`"></slot>
            </template>
            <template v-if="isSlot(column,`footer`)"
              v-slot:footer="rowData">
              <slot v-bind="rowData"
                :name="`${column.field}_footer`"></slot>
            </template>
            <template v-if="isSlot(column,`filter`)"
              v-slot:filter="rowData">
              <slot v-bind="rowData"
                :name="`${column.field}_filter`"></slot>
            </template>
            <template v-if="isSlot(column,`edit`)"
              v-slot:edit="rowData">
              <slot v-bind="rowData"
                :name="`${column.field}_edit`"></slot>
            </template>
          </vxe-table-column>
        </template>
      </template>
      <!-- 表格操作列 -->
      <vxe-table-column :fixed="realOperationsConfig.fixed"
        :title="getInternationalValue(realOperationsConfig.title)"
        :width="realOperationsConfig.width"
        :min-width="realOperationsConfig.minWidth"
        :align="realOperationsConfig.align"
        v-if="operations&&operations instanceof Array&&operations.length"
        :class-name="realOperationsConfig.className">
        <template v-slot:default="{row,rowIndex}">
          <table-operations :row="row"
            :row-index="rowIndex"></table-operations>
        </template>
      </vxe-table-column>
    </vxe-table>
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
import { getDefaultVal } from './../../../utils/index'
import tableCommon from './../../core/table'
import VxeColumn from './vxe-column'
import cloneDeep from 'lodash/cloneDeep'
import TableOperations from './operations'
import TableBtns from './table-btns'
export default {
  name: 'NsGrid',
  mixins: [tableCommon],
  components: { VxeColumn, TableOperations, TableBtns },
  props: {
    gridConfig: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      searchFormModel: {},
      loading: false,
      selection: []
    }
  },
  methods: {
    getDefaultVal,
    formatterColumns(data) {
      function getList(listData) {
        const list = []
        listData.map((item) => {
          const { type, children, show, prop, label } = item
          let isShow = true
          if (show === undefined) {
            isShow = true
          } else if (show && typeof show === 'string') {
            isShow = eval(judgesObj) /*eslint-disable-line*/
          } else if (Object.prototype.toString.call(show) === '[object Function]') {
            isShow = show(item)
          } else if (typeof show === 'boolean') {
            isShow = show
          }
          if (prop) {
            item.field = prop
            delete item.prop
          }
          if (label) {
            item.title = label
            delete item.label
          }
          if (isShow) {
            if (children && children.length) {
              item.children = getList(children)
            }
            if (type && type === 'index') {
              item.type = 'seq'
            }
            list.push(item)
          }
        })
        return list
      }
      return getList(data)
    },

    isSlot({ slots }, slotProp, isDefault) {
      if (slots === undefined) {
        return false
      }
      if (typeof slots === 'boolean' && slots && isDefault) {
        return true
      } else if (slots instanceof Array && slots.length) {
        return slots.includes(slotProp)
      } else {
        return false
      }
    },

    getPageCount(total, size) {
      return Math.max(Math.ceil(total / size), 1)
    }
  },

  computed: {
    tableColumns() {
      const copyColumns = cloneDeep(this.columns)
      const columns = this.formatterColumns(copyColumns)
      return columns
    }
  }
}
</script>
