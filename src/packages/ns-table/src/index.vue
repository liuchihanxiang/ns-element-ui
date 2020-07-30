<!-- v-loading.lock="loading" -->
<template>
  <div class="ns-table ns-table-container">
    <!-- 查询表单 -->
    <div class="header_wraps" v-if="isShow">
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
      <div v-if="btnList.length" class="btn_wraps">
        <template v-for="(btnItem,btnIndex) in btnList">
          <template v-if="btnItem.code&&permit">
            <el-button
              v-if="permit(btnItem.code)"
              :key="btnIndex"
              :class="btnItem.class"
              @click="btnItem.click?btnItem.click(btnItem.code):''"
              :type="btnItem.type?btnItem.type:'primary'"
            >{{getInternationalValue(permit(btnItem.code))}}</el-button>
          </template>
          <template v-else>
            <el-button
              v-if="btnItem.text"
              :key="btnIndex"
              :class="btnItem.class"
              @click="btnItem.click?btnItem.click():''"
              :type="btnItem.type?btnItem.type:'primary'"
            >{{getInternationalValue(btnItem.text)}}</el-button>
          </template>
        </template>
      </div>
    </div>

    <!-- 表格上方按钮 -->
    <!-- <div class="table-btn-container">
      <div v-if="showDefaultBtn" class="table-default-btnList pull-right">
        <el-button @click="handlerRefresh" v-if="showRefreshBtn" size="small" circle>
          <i class="el-icon-refresh" />
        </el-button>
        <el-button v-if="formList.length" @click="handlersearchForm" size="small" circle>
          <i class="el-icon-search" />
        </el-button>
        <el-dropdown v-if="!isComplexHeader" :hide-on-click="false" class="cloumns-switch">
          <span class="el-dropdown-link">
            <el-button size="small" circle>
              <i class="el-icon-menu" />
            </el-button>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-checkbox-group v-model="showClomnuIndex">
              <el-dropdown-item v-for="(item,index) in showClomnuList" :key="index">
                <el-checkbox :label="item.index">{{item.label}}</el-checkbox>
              </el-dropdown-item>
            </el-checkbox-group>
          </el-dropdown-menu>
        </el-dropdown>
    </div>-->
    <!-- <slot name="btnList">
        <template v-if="btnList.length">
          <el-button-group class="table-left-btnList pull-left">
            <template v-for="(btnItem,btnIndex) in btnList">
              <el-button
                v-if="btnItem.text&&(!btnItem.position||btnItem.position==='left')"
                :class="btnItem.class"
                :key="btnIndex"
                @click="btnItem.click?btnItem.click($event):''"
                :type="btnItem.type?btnItem.type:'primary'"
              >{{getInternationalValue(btnItem.text)}}</el-button>
            </template>
          </el-button-group>
          <el-button-group class="table-right-btnList pull-right">
            <template v-for="(btnItem,btnIndex) in btnList">
              <el-button
                v-if="btnItem.text&&btnItem.position==='right'"
                :key="btnIndex"
                :class="btnItem.class"
                @click="btnItem.click?btnItem.click($event):''"
                :type="btnItem.type?btnItem.type:'primary'"
              >{{getInternationalValue(btnItem.text)}}</el-button>
            </template>
          </el-button-group>
        </template>
    </slot>-->
    <!-- </div> -->

    <!-- 选中数据显示条数 -->
    <el-collapse-transition>
      <el-alert v-if="selection.length&&showSelectTips" :closable="false" class="alert-selection-tips" type="success">
        当前已选{{selection.length}}条数据
        <el-button type="text" size="mini" @click="clearSelect">清空所选</el-button>
        <slot name="selectionContent" />
      </el-alert>
    </el-collapse-transition>

    <!-- 表格 -->
    <el-table
      ref="elBaseTable"
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
      @expand-change="(row, expanded) => emitEventHandler('expand-change', row, expanded)"
    >
      <!-- 多选 -->
      <el-table-column
        v-if="columns[0].type&&type.indexOf(columns[0].type)>=0"
        :align="columns[0].align?columns[0].align:'left'"
        :header-align="columns[0].headerAlign?columns[0].align:'left'"
        :class-name="(columns[0].className||'')+' el-table-checkbox' "
        :type="columns[0].type"
        reserve-selection
        :width="columns[0].width?columns[0].width:50"
      />
      <!-- 单选 -->
      <el-table-column
        :class-name="(columns[0].className||'')+' el-table-checkbox' "
        v-if="columns[0].type==='radio'"
        :width="columns[0].width?columns[0].width:50"
      >
        <template slot-scope="scope">
          <el-radio v-model="radio" :label="scope.$index">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <!-- 正常显示列 -->
      <template v-for="(column,columnIndex) in columns">
        <template v-if="column.children&&column.children.length">
          <column :column-option="column" :key="columnIndex"></column>
        </template>
        <template v-else>
          <el-table-column
            v-if="!column.type&&showClomnuIndex.indexOf(columnIndex)!=-1&&(typeof column.show==='undefined'||column.show)"
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
                <span v-html="column.formatter(scope.row,scope.row[column.prop]) " />
              </template>
              <span v-else>{{scope.row[column.prop]}}</span>
            </template>
          </el-table-column>
        </template>
      </template>

      <!-- 表格操作列 -->
      <el-table-column
        :fixed="realOperationsConfig.fixed"
        :label="getInternationalValue(realOperationsConfig.title)"
        :width="realOperationsConfig.width"
        :min-width="realOperationsConfig.minWidth"
        :align="realOperationsConfig.align"
        v-if="operations&&operations instanceof Array&&operations.length&&!isMobile"
        :class-name="realOperationsConfig.className"
      >
        <template slot-scope="scope">
          <table-operations :row="scope.row"></table-operations>
        </template>
      </el-table-column>
    </el-table>

    <!-- 表格分页 -->
    <div v-if="pagination" style="margin-top: 10px;text-align: right;">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageList"
        :page-size="pageSize"
        :layout="paginationLayout"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import { tableProps } from './props'
import Column from './column'
import TableOperations from './operations'
import { isExist, isEmptyObject, getValueByPath, getDefaultVal } from './../../../utils/index'
import tableMixins from './mixins.js'
import NsForm from '../../ns-form/src/index.vue'
export default {
  components: { NsForm, TableOperations, Column },
  name: 'NsTable',
  mixins: [tableMixins],
  props: tableProps,
  provide() {
    return {
      table: this
    }
  },
  data() {
    return {
      total: 0,
      page: 1,
      pageSize: 10,
      loading: false,
      selectKey: '',
      searchFormModel: {},
      isTreeStatus: false,
      currentData: [],
      cachData: [],
      selection: [],
      type: ['selection', 'index', 'expand'],
      radio: false,
      isShow: true,
      showClomnuIndex: [],
      showClomnuList: [],
      isComplexHeader: false, // 判断是否是复合表头
      tableId: new Date().getTime()
    }
  },
  methods: {
    isEmptyObject,
    getDefaultVal,
    emitEventHandler(event) {
      this.$emit(event, ...Array.from(arguments).splice(1))
    },

    // 切换每页显示
    handleSizeChange(size) {
      this.pageSize = size
      this.initData(this.searchFormModel)
    },

    // 切换分页
    handleCurrentChange(page) {
      this.page = page
      this.initData(this.searchFormModel)
    },

    // 处理查询
    handlerSearch(resetPage = true) {
      if (resetPage) {
        this.page = 1
      }
      if (this.url && this.search === 'server') {
        this.initData(this.searchFormModel)
      } else {
        this.filterData()
      }
    },

    filterData() {
      const serchFormKeyList = Object.keys(this.searchFormModel)
      const searchFormListKey = serchFormKeyList.filter(key => this.searchFormModel[key] !== '')
      if (!searchFormListKey.length) {
        this.currentData = JSON.parse(JSON.stringify(this.cachData))
      } else {
        let data = JSON.parse(JSON.stringify(this.cachData))
        if (this.treeTable) {
          this.currentData = this.treeFilter(this.filterTree(data, searchFormListKey))
        } else {
          this.currentData = data.filter(item => {
            return this.isIncludesObj(item, searchFormListKey)
          })
        }
      }
    },

    isIncludesObj(obj, keyList) {
      return keyList.every(key => {
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
        item.children.forEach(child => {
          if (this.isNeedBranch(child, keyList)) {
            flag2 = true
          }
        })
      }
      return flag1 || flag2
    },

    filterTree(data, keyList) {
      return data.map(item => {
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

    /**
     * 从后台获取数据时 第一次进来tableData为空  所以url或者fetch只要有一个就可以第一次请求数据
     * 请求到数据后 若有分页且是前台分页则把数据放到tableData
     * 后面点击分页时 tableData不为0直接进到localDataHandler方法里面
     * 若是后台分页 则不存数据到tableData 直接赋值给currentData
     */
    initData() {
      let { tableData, url, fetch } = this
      //  数据从哪里拿 前台还是后台
      if (!tableData.length && (url || fetch)) {
        //  数据从后台拿  必须满足 url和fetch字少有一个 并且没有从后台拿过数据
        this.initServe(arguments[0])
      } else {
        this.handleLocalData(tableData)
      }
    },

    // 处理传来的静态数据
    handleLocalData() {
      let { pagination, tableData } = this
      let cachData = JSON.parse(JSON.stringify(tableData))
      this.cachData = JSON.parse(JSON.stringify(tableData))
      if (pagination) {
        this.paginationData(cachData)
      } else {
        this.currentData = cachData
      }
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
    },

    // 请求数据
    initServe(formParams = {}) {
      this.loading = true
      let { fetch, url, $http, pagination, realDataFieldConfig, sidePagination, page, pageSize, queryParams, httpMethod } = this
      let params = {} // 请求参数
      // 请求之前处理参数
      if (queryParams && typeof queryParams === 'function') {
        params = queryParams(formParams)
      } else if (queryParams && typeof queryParams === 'object') {
        params = Object.assign(queryParams, formParams)
      } else {
        params = formParams
      }
      // 分页参数
      if (pagination) {
        params = Object.assign(params, {
          [realDataFieldConfig.pageIndexKey]: page,
          [realDataFieldConfig.pageSizeKey]: pageSize
        })
      }
      // 请求数据的函数处理
      let uestObject = null
      if (fetch) {
        uestObject = fetch(params)
      } else {
        let defaultMethod = this.$NS.httpMethod
        let method = httpMethod ? httpMethod.toLowerCase() : defaultMethod
        if (method === 'get') {
          uestObject = $http[method](url, { params })
        } else {
          uestObject = $http[method](url, params)
        }
      }
      // 开始请求数据
      uestObject
        .then(res => {
          if (res) {
            let list = res.data && res.data instanceof Array ? res.data : getValueByPath(res, realDataFieldConfig.listKey)
            // 前端分页 要处理数据
            if (pagination && sidePagination === 'client') {
              this.paginationData(list)
            } else if (pagination && sidePagination === 'server') {
              let totalValue = getValueByPath(res, realDataFieldConfig.totalKey) // 总页数
              this.total = totalValue || 0
              let maxPage = Math.ceil(this.total / this.pageSize)
              if (this.page > maxPage && maxPage !== 0) {
                this.handleCurrentChange(maxPage)
                return false
              }
            }
            if (this.responseHandler) {
              this.currentData = this.responseHandler(list)
            } else {
              this.currentData = list
            }
            if (this.search === 'client') {
              this.cachData = JSON.parse(JSON.stringify(this.currentData))
            }
            if (this.loadSuccess) {
              this.$nextTick(() => {
                this.loadSuccess(res)
              })
            }
            this.loading = false
          }
        })
        .catch(error => {
          this.loading = false
          console.log(error) /*eslint-disable-line*/
        })
    },
    // 处理前端分页
    paginationData(data) {
      let { pageSize, page } = this
      let totalValue = data.length // 这里不必判断总页数为0 能进到这个函数就必须有数据
      this.total = totalValue
      this.currentData = data.filter((v, i) => {
        if (i >= (page - 1) * pageSize && i < page * pageSize) {
          return true
        }
      })
    }
  },
  computed: {
    realIsInternational() {
      let { isInternational } = this.$NS
      return isExist(this.isInternational) ? this.isInternational : isInternational
    },
    realOperationsConfig() {
      let { operationsConfig } = this.$NS
      let defaultConfig = {
        fixed: 'right',
        title: '操作',
        align: 'left',
        operationMore: '更多',
        className: '',
        onlyShowIcon: false,
        autoDropdown: true,
        dropdownMaxNum: 4
      }
      return Object.assign({}, defaultConfig, operationsConfig, this.operationsConfig)
    },

    realDataFieldConfig() {
      let { dataFieldConfig } = this.$NS
      let defaultConfig = {
        listKey: 'data.data',
        pageSizeKey: 'pageSize',
        pageIndexKey: 'currentPage',
        totalKey: 'data.total'
      }
      return Object.assign({}, defaultConfig, dataFieldConfig, this.dataFieldConfig)
    },
    realShowSearchForm() {
      let { showSearchForm } = this.$NS
      return isExist(this.showSearchForm) ? this.showSearchForm : showSearchForm
    },
    treeProps() {
      const { treeTable, treeChildrenKey, hasChildrenKey } = this
      if (treeTable) {
        return { children: treeChildrenKey, hasChildren: hasChildrenKey }
      } else {
        return { children: 'childrenNull', hasChildren: 'hasChildren' }
      }
    }
  },
  watch: {
    columns: {
      handler(val) {
        val.forEach((ele, index) => {
          if (ele.show || typeof ele.show === 'undefined') {
            if (typeof ele.hide === 'undefined' || ele.hide) {
              this.showClomnuIndex.push(index)
            }
            if (ele.children && ele.children.length) {
              this.isComplexHeader = true
            }
            if (ele.isCloumnSwitch !== false && (!ele.children || !ele.children.length)) {
              this.showClomnuList.push({
                label: ele.label,
                index: index
              })
            }
          }
        })
      },
      deep: true,
      immediate: true
    },
    tableData: {
      handler(val, oldVal) {
        if (typeof oldVal !== 'undefined') {
          this.initData(this.searchFormModel)
        }
      },
      immediate: true
    },
    realShowSearchForm: {
      handler(val) {
        this.isShow = val
      },
      immediate: true
    }
  },
  mounted() {
    this.isTreeStatus = false // 刷新页面不保存 状态 病移除cookies
    window.sessionStorage.removeItem(this.tableId)
    this.initData(this.searchFormModel)
  },
  created() {
    // this.showClomnuInit()
  }
}
</script>
