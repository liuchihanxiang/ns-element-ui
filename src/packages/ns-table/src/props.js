export const tableProps = {
  isInternational: {
    type: Boolean
  },
  // 查询表单配置项
  formOption: {
    type: Object,
    default: function () {
      return {}
    }
  },
  formList: {
    type: Array,
    default: () => []
  },
  permit: Function,
  collapsedIcon: {
    type: String,
    default: 'el-icon-caret-right'
  },
  expandedIcon: {
    type: String,
    default: 'el-icon-caret-bottom'
  },

  btnList: {
    type: Array,
    default: () => []
  },
  btnListSlot: {
    type: String,
    default: ''
  },
  showDefaultBtn: {
    type: Boolean,
    default: false
  },
  treeLoad:Function,
  lazy:{
    type: Boolean,
    default: false
  },
  fetch: Function,
  isMobile: {
    type: Boolean,
    default: false
  },
  sidePagination: {
    type: String,
    default: 'server',
    validator: function (value) {
      return ['client', 'server'].indexOf(value) !== -1
    }
  },
  search: {
    type: String,
    default: 'server',
    validator: function (value) {
      return ['client', 'server'].indexOf(value) !== -1
    }
  },

  showRefreshBtn: {
    type: Boolean,
    default: true
  },
  clickToSelect: {
    type: Boolean,
    default: true
  },
  dataFieldConfig: Object, // 字段key值设置
  operations: Array,
  operationsConfig: Object, // 操作设置

  httpMethod: String,
  responseHandler: Function,
  loadSuccess: Function,
  url: String,
  queryParams: [Function, Object],

  // 分页相关
  pagination: {
    type: Boolean,
    default: true
  },
  pageList: {
    type: Array,
    default: () => [10, 20, 50, 100]
  },
  paginationLayout: {
    type: String,
    default: 'total, prev, pager, next, jumper, sizes'
  },

  // 树形表格相关
  treeTable: {
    type: Boolean,
    default: false
  },
  treeChildrenKey: {
    type: String,
    default: 'children'
  },
  expandAll: {
    type: Boolean,
    default: false
  },
  treeCtrlIndex: {
    type: Number,
    default: 0
  },

  uniqueId: {
    type: String,
    default: 'id'
  },
  tableData: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    require: true
  },
  height: [String, Number],
  maxHeight: [String, Number],
  stripe: {
    type: Boolean,
    default: false
  },
  border: {
    type: Boolean,
    default: false
  },
  showSearchForm: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    validator: function (value) {
      return ['medium', 'small', 'mini'].indexOf(value) !== -1
    }
  },
  fit: {
    type: Boolean,
    default: true
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  highlightCurrentRow: {
    type: Boolean,
    default: false
  },
  currentRowKey: [String, Number],
  rowKey: {
    type: [Function, String],
    default: 'id'
  },
  rowClassName: [Function, String],
  rowStyle: [Function, Object],
  cellClassName: [Function, String],
  cellStyle: [Function, String],
  headerRowStyle: [Function, Object],
  headerCellClassName: [Function, String],
  headerRowClassName: [Function, String],
  headerCellStyle: [Function, Object],
  empyText: {
    type: String,
    default: '暂无数据'
  },
  defautExpandAll: {
    type: Boolean,
    default: false
  },
  defaultSort: Object,
  tooltipEffect: String,
  summaryMethod: Function,
  spanMethod: Function,
  selectOnIndeterminate: {
    type: Boolean,
    default: true
  },
  showSelectTips: {
    type: Boolean,
    default: true
  }
}
