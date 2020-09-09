<template>
  <div>
    <!-- 查询表单 -->
    <div class="header_wraps">
      <ns-form
        class="form_wraps"
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
        :inline-message="formOption.inlineMessage"
        :inline="formOption.inline"
        :disabled="formOption.disabled"
        :size="formOption.size"
        :submit-loading="loading"
        :search-btn="formOption.searchBtn"
        :reset-btn="formOption.resetBtn"
        :handler-submit="handlerSearch"
      >
        <template slot="extraBtn">
          <slot name="searchBtn" />
        </template>
      </ns-form>
      <slot name="btnList">
        <div v-if="btnList.length" class="btn_wraps">
          <template v-for="(btnItem,btnIndex) in btnList">
            <template v-if="btnItem.code&&permit">
              <el-button
                v-if="permit(btnItem.code)"
                :key="btnIndex"
                :disabled="btnItem.disabled"
                :class="btnItem.class"
                @click="btnItem.click?btnItem.click(btnItem.code):''"
                :type="btnItem.type?btnItem.type:'primary'"
              >{{getInternationalValue(permit(btnItem.code))}}</el-button>
            </template>
            <template v-else>
              <el-button
                v-if="btnItem.text"
                :key="btnIndex"
                :disabled="btnItem.disabled"
                :class="btnItem.class"
                @click="btnItem.click?btnItem.click():''"
                :type="btnItem.type?btnItem.type:'primary'"
              >{{getInternationalValue(btnItem.text)}}</el-button>
            </template>
          </template>
        </div>
      </slot>
    </div>
    <!-- 选中数据显示条数 -->
    <el-collapse-transition>
      <el-alert v-if="selection.length&&showSelectTips" :closable="false" class="alert-selection-tips" type="success">
        当前已选{{selection.length}}条数据
        <el-button type="text" size="mini" @click="clearSelect">清空所选</el-button>
        <slot name="selectionContent" />
      </el-alert>
    </el-collapse-transition>
    <vxe-grid
      border
      resizable
      height="300"
      :loading="loading"
      :columns="tableColumns"
      :toolbar="toolbar"
      :data="tableData"
      ,
      :table-proxy="tableProxy"
    ></vxe-grid>
  </div>
</template>

<script>
import tableProps from './props'
export default {
  name: 'NsGrid',
  props: tableProps,
  data() {
    return {
      searchFormModel: {},
      selection: [],
      tableProxy: {

      }
    }
  },
  methods: {
    formatterColumns(list) {
      if (!list.length) { return [] }
      return list.map(item => {
        let { prop, label, children } = item
        if (children && children.length) {
          item.children = this.formatterColumns(children)
        }
        if (prop) {
          item.field = prop
          delete item.field
        }
        if (label) {
          item.title = label
          delete item.label
        }
        return item
      })
    },
    handlerSearch() {

    },
    clearSelect() {},
    queryData() {
      // return this.$http
    }

  },

  computed: {
    tableColumns() {
      let columns = this.formatterColumns(this.columns)
      let operationColumns = {
        title: '操作',
        slots: {
          default: 'opration'
        }
      }
      if (this.operations.length) {
        columns.push(operationColumns)
      }
      return columns
    },
    tableProxy() {
      if (!this.url) { return {} }
      let ajaxConfig = {
        ajax: {
          // 任何支持 Promise API 的库都可以对接（fetch、jquery、axios、xe-ajax）
          query: () => XEAjax.post(this.url)
        }
      }
    }
  }
}
</script>

<style>
</style>
