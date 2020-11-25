<template>
  <div>
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
    <!-- 表格 -->
    <vxe-table ref="elBaseTable"
      :data="currentData"
      class="ns-base-table">
      <!-- 正常显示列 -->
      <template v-for="(column,columnIndex) in tableColumns">
        <template v-if="column.children&&column.children.length">
          <vxe-column :column="column"
            :key="columnIndex"></vxe-column>
        </template>
        <template v-else>
          <vxe-table-column :key="columnIndex"
            :column-key="column.columnKey"
            :prop="column.prop">
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
          let { prop, label, type, children, show } = item
          if (prop === 'ss12') {
            debugger
          }
          let isShow = true
          if (show === undefined) {
            isShow = true
          } else if (show && typeof show === 'string') {
            isShow = eval(judgesObj) /*eslint-disable-line*/
          } else if (Object.prototype.toString.call(show) === '[object Function]') {
            debugger
            isShow = show(item)
          } else if (typeof show === 'boolean') {
            isShow = show
          }
          if (isShow) {
            if (children && children.length) {
              item.children = getList(children)
            }
            if (prop) {
              item.field = prop
              delete item.prop
            }
            if (type && type === 'index') {
              item.type = 'seq'
            }
            if (label) {
              item.title = label
              delete item.label
            }
            list.push(item)
          }
        })
        return list
      }

      return getList(data)
    },
    getPageCount(total, size) {
      return Math.max(Math.ceil(total / size), 1)
    }
  },

  computed: {
    tableColumns() {
      let copyColumns = cloneDeep(this.columns)
      let columns = this.formatterColumns(copyColumns)
      console.log(columns, 7514)
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

<style>
</style>
