<!-- v-loading.lock="loading" -->
<template>
  <div class="ns-table-container">
    <!-- 查询表单 -->
    <el-collapse-transition>
      <el-card shadow="never"
               v-if="formList.length&&isShow">
        <ns-form ref="serchForm"
                 type="searchForm"
                 v-model="searchFormModel"
                 :is-international="realIsInternational"
                 :is-column-mixins="isColumnMixins"
                 :form-list="formList"
                 :label-position="formOptions&&formOptions.labelPosition"
                 :label-width="formOptions&&formOptions.labelWidth || 0"
                 :label-suffix="formOptions&&formOptions.labelSuffix"
                 :status-icon="formOptions&&formOptions.statusIcon"
                 :inline-message="formOptions&&formOptions.inlineMessage"
                 :inline="formOptions&&formOptions.inline"
                 :disabled="formOptions&&formOptions.disabled"
                 :size="formOptions&&formOptions.size"
                 :submit-loading="loading"
                 :search-btn="formOptions&&formOptions.searchBtn"
                 :reset-btn="formOptions&&formOptions.resetBtn"
                 :form-format="formOptions&&formOptions.formFormat"
                 :handler-submit="handlerSearch">
          <template slot="extraBtn">
            <slot name="searchBtn" />
          </template>
        </ns-form>
      </el-card>
    </el-collapse-transition>
    <!-- 表格上方按钮 -->
    <div class="table-btn-container">
      <template v-if="btnList.length&&!btnListSlot">
        <el-button-group class="table-left-btnList pull-left">
          <template v-for="(btnItem,btnIndex) in btnList">
            <el-button v-if="!btnItem.position||btnItem.position==='left'"
                       :class="btnItem.class"
                       :key="btnIndex"
                       @click="btnItem.click?btnItem.click($event):''"
                       :type="btnItem.type?btnItem.type:'primary'">{{getInternationalValue(btnItem.text)}}</el-button>
          </template>

        </el-button-group>

        <el-button-group class="table-right-btnList pull-right">
          <template v-for="(btnItem,btnIndex) in btnList">
            <el-button v-if="btnItem.position==='right'"
                       :key="btnIndex"
                       :class="btnItem.class"
                       @click="btnItem.click?btnItem.click($event):''"
                       :type="btnItem.type?btnItem.type:'primary'">{{getInternationalValue(btnItem.text)}}</el-button>
          </template>
        </el-button-group>
      </template>
      <template v-else-if="btnListSlot">
        <slot :name="btnListSlot" />
      </template>
      <div v-if="showDefaultBtn"
           class="table-default-btnList pull-right">
        <el-button @click="handlerRefresh"
                   v-if="showRefreshBtn"
                   size='small'
                   circle>
          <i class="el-icon-refresh" />
        </el-button>
        <el-button v-if='formList.length'
                   @click="handlersearchForm"
                   size='small'
                   circle>
          <i class="el-icon-search" />
        </el-button>

        <el-dropdown :hide-on-click="false"
                     class="cloumns-switch">
          <span class="el-dropdown-link">
            <el-button size='small'
                       circle>
              <i class="el-icon-menu" />
            </el-button>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-checkbox-group v-model="showClomnuIndex">
              <el-dropdown-item v-for="(item,index) in showClomnuList"
                                :key="index">
                <el-checkbox :label="item.index">{{item.label}}</el-checkbox>
              </el-dropdown-item>
            </el-checkbox-group>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 选中数据显示条数 -->
    <el-collapse-transition>
      <el-alert v-if="selection.length&&showSelectTips"
                :closable='false'
                class="alert-selection-tips"
                type="success">
        当前已选{{selection.length}}条数据
        <el-button type="text"
                   size="mini"
                   @click="clearSelect">清空所选</el-button>
        <slot name='selectionContent' />
      </el-alert>
    </el-collapse-transition>
    <!-- 表格 -->
    <el-table ref="elBaseTable"
              class="ns-table"
              :data-id="tableId"
              element-loading-text="拼命加载中..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :data="formatData"
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
              :row-style="treeTable?showRow:rowStyle"
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
              :tree-props="{children: 'childrenas', hasChildren: 'hasChildren'}"
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
      <el-table-column v-if="columns[0].type&&type.indexOf(columns[0].type)>=0"
                       :align="columns[0].align?columns[0].align:'center'"
                       :header-align="columns[0].headerAlign?columns[0].align:'center'"
                       :class-name="(columns[0].className||'')+' el-table-checkbox' "
                       :type="columns[0].type"
                       reserve-selection
                       :width="columns[0].width?columns[0].width:50" />
      <el-table-column :class-name="(columns[0].className||'')+' el-table-checkbox' "
                       v-if="columns[0].type==='radio'"
                       :width="columns[0].width?columns[0].width:50">
        <template slot-scope="scope">
          <el-radio v-model="radio"
                    :label="scope.$index">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <template v-for="(column,columnIndex) in columns">
        <template v-if="!column.children||!column.children.length">
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
        <template v-else>
          <el-table-column :label="column.label"
                           header-align="center"
                           :key="columnIndex">
            <template v-for="(cColumn,cIndex) in column.children">
              <el-table-column :key="cIndex"
                               :column-key="cColumn.columnKey"
                               :prop="cColumn.prop"
                               :label="getInternationalValue(cColumn.label)"
                               :width="cColumn.width"
                               :min-width="cColumn.minWidth"
                               :fixed="cColumn.fixed"
                               :render-header="cColumn.renderHeader"
                               :sortable="cColumn.sortable"
                               :sort-method="cColumn.sortMethod"
                               :resizable="cColumn.resizable"
                               :show-overflow-tooltip="typeof cColumn.showOverflowTooltip==='undefined'?true:cColumn.showOverflowTooltip"
                               :align="getAlignStyle(cColumn.align,columnIndex)"
                               :header-align="getAlignStyle(cColumn.headerAlign,columnIndex)"
                               :class-name="cColumn.className"
                               :label-class-name="cColumn.labelClassName"
                               :selectable='cColumn.selectable'
                               :reserve-selection='cColumn.reserveSelection'
                               :filters="cColumn.filters"
                               :filter-placement="cColumn.filterPlacement"
                               :filter-multiple="cColumn.filterMultiple"
                               :filter-method="cColumn.filterMethod"
                               :filtered-value="cColumn.filteredValue">
                <template slot="header">
                  <span v-if="cColumn.headerSlotName">
                    <slot :name='cColumn.headerSlotName'
                          :row="cColumn" />
                  </span>
                  <span v-else>{{cColumn.label}}</span>
                </template>
                <template slot-scope="scope">
                  <span v-if="cColumn.filter">
                    {{ Vue.filter(cColumn['filter'])(scope.row[cColumn.prop]) }}
                  </span>
                  <span v-else-if="cColumn.slotName">
                    <slot :name="cColumn.slotName"
                          :row="scope.row"
                          :$index="scope.$index" />
                  </span>
                  <!-- <span v-else-if="column.htmlFormatter">
                {{column.htmlFormatter(scope.row,scope.row[column.prop])}}
              </span> -->
                  <template v-else-if="cColumn.formatter">
                    <span v-html="cColumn.formatter(scope.row,scope.row[cColumn.prop]) " />
                  </template>
                  <span v-else>{{scope.row[cColumn.prop]}}</span>
                </template>
              </el-table-column>
            </template>
          </el-table-column>
        </template>
      </template>
      <!-- 表格操作列 -->
      <el-table-column fixed="right"
                       :label="getInternationalValue(operationText)"
                       width="170"
                       v-if="operations&&operations instanceof Array&&operations.length&&!isMobile"
                       class-name="operation-list no-choose-row">
        <template slot-scope="scope">
          <table-operations :row="scope.row"
                            :operationMore="operationMore"
                            :realOperationsOnlyShowIcon='realOperationsOnlyShowIcon'
                            :operations="operations"
                            :operationsAutoDropdownMaxNum="operationsAutoDropdownMaxNum"></table-operations>

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
import TableOperations from './operations'
import { isExist, isEmptyObject, isJsonString, getValueByPath } from './utils.js'
import tableMixins from './mixins.js'
import treeToArray from './tree-table.js'
import NsForm from '../../ns-form/src/index.vue'
export default {
  components: { NsForm, TableOperations },
  name: 'NsTable',
  mixins: [tableMixins],
  props: tableProps,
  data () {
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
      tableId: new Date().getTime()
    }
  },
  methods: {
    isEmptyObject,
    emitEventHandler (event) {
      this.$emit(event, ...Array.from(arguments).splice(1))
    },
    // 切换每页显示
    handleSizeChange (size) {
      this.pageSize = size
      this.initData(this.searchFormModel)
    },

    // 切换分页
    handleCurrentChange (page) {
      this.page = page
      this.initData(this.searchFormModel)
    },

    // 处理查询
    handlerSearch (resetPage = true) {
      if (resetPage) {
        this.page = 1
      }
      if (this.url && this.search === 'server') {
        this.initData(this.searchFormModel)
      } else {
        this.filterData()
      }
    },
    filterData () {
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
    isIncludesObj (obj, keyList) {
      return keyList.every(key => {
        let val = this.searchFormModel[key]
        const itemVal = obj[key]
        return itemVal && itemVal.includes(val)
      })
    },
    isNeedBranch (item, keyList) {
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
    filterTree (data, keyList) {
      return data.map(item => {
        item.isNeed = this.isNeedBranch(item, keyList)
        if (item.children && item.children.length) {
          this.filterTree(item.children, keyList)
        }
        return item
      })
    },
    treeFilter (data) {
      return data.filter((item, index) => {
        if (item && item.children && item.children.length) {
          item._expanded = true
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
    initData () {
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
    handleLocalData () {
      let {
        pagination,
        tableData
      } = this
      let cachData = JSON.parse(JSON.stringify(tableData))
      this.cachData = JSON.parse(JSON.stringify(tableData))
      if (pagination) {
        this.paginationData(cachData)
      } else {
        this.currentData = cachData
      }
    },

    delSelection (ids) {
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
    initServe (formParams = {}) {
      this.loading = true
      let {
        fetch,
        url,
        $http,
        pagination,
        sidePagination,
        realListField,
        realPageIndexKey,
        realPageSizeKey,
        page,
        pageSize,
        realTotalField,
        queryParams,
        ajaxOptions
      } = this
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
          [realPageIndexKey]: page,
          [realPageSizeKey]: pageSize
        })
      }
      // 请求数据的函数处理
      let uestObject = null
      if (fetch) {
        uestObject = fetch(params)
      } else {
        let defaultMethod = this.$NS.ajaxMethod
        let method = ajaxOptions.method
          ? ajaxOptions.method.toLowerCase()
          : defaultMethod
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
            let list = res.data && res.data instanceof Array ? res.data : getValueByPath(res, realListField)
            // 前端分页 要处理数据
            if (pagination && sidePagination === 'client') {
              this.paginationData(list)
            } else if (pagination && sidePagination === 'server') {
              let totalValue = getValueByPath(res, realTotalField)// 总页数
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
            if (this.search === 'client') { this.cachData = JSON.parse(JSON.stringify(this.currentData)) }
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
    paginationData (data) {
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
    // 表格数据
    formatData () {
      // 不是树形表格 直接返回
      if (!this.treeTable) {
        return this.currentData
      }
      let tmp // 表格数据
      // let parentIds = []
      if (!Array.isArray(this.currentData)) {
        tmp = [this.currentData]
      } else {
        tmp = this.currentData
      }
      // 获取树形表格展开状态
      let cookiesStatusString = window.sessionStorage.getItem(this.tableId) || '[]'
      let cookiesStatus = isJsonString(cookiesStatusString) ? JSON.parse(cookiesStatusString) : []
      // 格式化表格数据 加上必要标识字段
      const func = treeToArray
      const args = [tmp, this.expandAll]
      tmp = func.apply(this, args)
      // 树形数据状态 不为空  并且 isTreeStatus为true时 格式化数据状态
      if (this.isTreeStatus && cookiesStatus && cookiesStatus.length) {
        tmp.forEach(v => {
          if (cookiesStatus.indexOf(v[this.rowKey]) >= 0) {
            v._expanded = true
          }
        })
      }
      return tmp
    },
    realIsInternational () {
      let { isInternational } = this.$NS
      return isExist(this.isInternational) ? this.isInternational : isInternational
    },
    realOperationsOnlyShowIcon () {
      let { operationsOnlyShowIcon } = this.$NS
      return isExist(this.operationsOnlyShowIcon) ? this.operationsOnlyShowIcon : operationsOnlyShowIcon
    },
    realShowSearchForm () {
      let { showSearchForm } = this.$NS
      return isExist(this.showSearchForm) ? this.showSearchForm : showSearchForm
    },
    realListField () {
      let { listField } = this.$NS
      return isExist(this.listField) ? this.listField : listField
    },
    realPageSizeKey () {
      let { pageSizeKey } = this.$NS
      return isExist(this.pageSizeKey) ? this.pageSizeKey : pageSizeKey
    },
    realPageIndexKey () {
      let { pageIndexKey } = this.$NS
      return isExist(this.pageIndexKey) ? this.pageIndexKey : pageIndexKey
    },
    realTotalField () {
      let { totalField } = this.$NS
      return isExist(this.totalField) ? this.totalField : totalField
    }

  },
  watch: {
    columns: {
      handler (val) {
        val.forEach((ele, index) => {
          if ((ele.show || typeof ele.show === 'undefined')) {
            if (typeof ele.hide === 'undefined' || ele.hide) {
              this.showClomnuIndex.push(index)
            }
            if (ele.isCloumnSwitch !== false) {
              let obj = {
                label: ele.label,
                index: index
              }
              this.showClomnuList.push(Object.assign({}, obj))
            }
          }
        })
      },
      deep: true,
      immediate: true
    },
    // 监控表格数据
    formatData: {
      handler (value, oldValue) {
        // 每次展开或收起数据时 保存当前数据状态
        this.saveTreeStateToCookies(value)
      },
      deep: true,
      immediate: true
    },
    tableData: {
      handler (val, oldVal) {
        if (typeof oldVal !== 'undefined') {
          this.initData(this.searchFormModel)
        }
      },
      immediate: true
    },
    realShowSearchForm: {
      handler (val) {
        this.isShow = val
      },
      immediate: true
    }

  },
  mounted () {
    this.isTreeStatus = false // 刷新页面不保存 状态 病移除cookies
    window.sessionStorage.removeItem(this.tableId)
    this.initData(this.searchFormModel)
  },
  created () {
    // this.showClomnuInit()
  }
}
</script>
<style rel="stylesheet/css" lang="scss">
@keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.ns-table-container {
  .el-table__header th.operation-list {
    text-align: left;
  }
  .el-table__row .el-table-checkbox {
    text-align: center;
  }
  .el-radio .el-radio__label {
    position: absolute;
  }
  .ns-item-container {
    width: 180px;
  }
  .search-btn-container {
    width: auto;
  }
  .table-btn-container {
    margin-bottom: 5px;
    clear: both;
    overflow: hidden;
  }
  .cloumns-switch {
    margin-left: 10px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .el-card {
    margin-bottom: 5px;
  }
  .el-card__body {
    padding: 10px;
  }
  .operation-list {
    text-align: left;
    .operation-text {
      font-size: 14px;
    }
    .el-button {
      margin-left: 0px;
      margin-right: 5px;
    }
    .operation-icon {
      margin-right: 5px;
      color: #409eff;
      font-size: 14px;
      i {
        font-size: 18px;
      }
      svg {
        font-size: 12px;
        position: relative;
        top: -3px;
      }
    }
    .operation-dropdown {
      cursor: pointer;
      .el-icon--right {
        margin-left: 0px;
      }
    }
  }
}
</style>
<style lang='scss' scoped>
$color-blue: #2196f3;
$space-width: 18px;
.alert-selection-tips {
  padding: 0;
}
.ms-tree-space {
  position: relative;
  top: 1px;
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: $space-width;
  height: 14px;
  &::before {
    content: "";
  }
}
.processContainer {
  width: 100%;
  height: 100%;
}
.tree-ctrl {
  position: relative;
  cursor: pointer;
  color: $color-blue;
  margin-left: -$space-width;
  i {
    font-size: 16px;
  }
}

.pull-right {
  float: right;
}
.pull-left {
  float: left;
}
</style>
