<template>
  <div class="ns-grid">
    <!-- 查询表单 -->
    <div class="header_wraps">
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
        :handler-submit="handlerSearch">
        <template slot="extraBtn">
          <slot name="searchBtn" />
        </template>
      </ns-form>
      <slot name="btnList">
        <div v-if="btnList.length"
          class="btn_wraps">
          <template v-for="(btnItem,btnIndex) in btnList">
            <template v-if="btnItem.code&&permit">
              <el-button v-if="permit(btnItem.code)"
                :key="btnIndex"
                :disabled="btnItem.disabled"
                :class="btnItem.class"
                @click="btnItem.click?btnItem.click(btnItem.code):''"
                :type="btnItem.type?btnItem.type:'primary'">{{getInternationalValue(permit(btnItem.code))}}</el-button>
            </template>
            <template v-else>
              <el-button v-if="btnItem.text"
                :key="btnIndex"
                :disabled="btnItem.disabled"
                :class="btnItem.class"
                @click="btnItem.click?btnItem.click():''"
                :type="btnItem.type?btnItem.type:'primary'">{{getInternationalValue(btnItem.text)}}</el-button>
            </template>
          </template>
        </div>
      </slot>
    </div>
    <vxe-toolbar custom
      print></vxe-toolbar>
    <!-- 表格 -->
    <vxe-table ref="elBaseTable"
      stripe
      highlight-hover-row
      :data="currentData"
      v-bind="gridConfig"
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
            <template v-if="isSlot(column,column.field)"
              v-slot:default="rowData">
              <slot v-bind="rowData"
                :name="`${column.field}`"></slot>
            </template>
            <template v-else-if="isSlot(column,`${column.field}_header`)"
              v-slot:header>
              <slot :name="`${column.field}_header`"></slot>
            </template>
            <template v-else-if="isSlot(column,`${column.field}_content`)"
              v-slot:content>
              <slot :name="`${column.field}_content`"></slot>
            </template>
            <template v-else-if="isSlot(column,`${column.field}_footer`)"
              v-slot:footer>
              <slot :name="`${column.field}_footer`"></slot>
            </template>
            <template v-else-if="isSlot(column,`${column.field}_filter`)"
              v-slot:filter>
              <slot :name="`${column.field}_filter`"></slot>
            </template>
            <template v-else-if="isSlot(column,`${column.field}_edit`)"
              v-slot:edit>
              <slot :name="`${column.field}_edit`"></slot>
            </template>
          </vxe-table-column>
        </template>
      </template>
      <!-- 表格操作列 -->
      <!-- <el-table-column :fixed="realOperationsConfig.fixed"
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
      </el-table-column> -->
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
export default {
  name: 'NsGrid',
  mixins: [tableCommon],
  components: { VxeColumn },
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
        let list = []
        listData.map((item) => {
          let { type, children, show, prop, label } = item
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
            delete item.field
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
    isSlot({ slotList }, slotProp) {
      return slotList && slotList.length && slotList.includes(slotProp)
    },
    getPageCount(total, size) {
      return Math.max(Math.ceil(total / size), 1)
    }
  },

  computed: {
    tableColumns() {
      let copyColumns = cloneDeep(this.columns)
      let columns = this.formatterColumns(copyColumns)
      // let operationColumns = {
      //   title: '操作',
      //   slots: {
      //     default: 'opration'
      //   }
      // }
      // if (this.operations.length) {
      //   columns.push(operationColumns)
      // }
      return columns
    }
  }
}
</script>
