export const tableProps = {
  isInternational: {
    type: Boolean
  },
  formOptions: {
    type: Object,
    default: () => {}
  }, // 查询表单

  collapsedIcon: {
    type: String,
    default: 'el-icon-caret-right'
  },
  expandedIcon: {
    type: String,
    default: 'el-icon-caret-bottom'
  },
  formList: {
    type: Array,
    default: () => []
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
    default: true
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
  isColumnMixins: {
    type: Boolean,
    default: true
  },
  showRefreshBtn: {
    type: Boolean,
    default: true
  },
  clickToSelect: {
    type: Boolean,
    default: true
  },
  operationText: {
    type: String,
    default: '操作'
  },
  operationMore: {
    type: String,
    default: '更多'
  },
  operations: Array,
  operationsOnlyShowIcon: Boolean,
  operationsAutoDropdown: {
    type: Boolean,
    default: true
  },
  operationsAutoDropdownMaxNum: {
    type: Number,
    default: 4
  },
  method: {
    type: String,
    default: 'get',
    validator: value => {
      return ['get', 'post', 'put', 'delete'].indexOf(value) !== -1
    }
  },
  ajaxOptions: {
    type: Object,
    default: () => {
      return {}
    }
  },
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
  pageSizeKey: String,
  listField: String,
  totalField: String,
  pageIndexKey: String,
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
    default: true
  },
  border: {
    type: Boolean,
    default: true
  },
  showSearchForm: {
    type: Boolean
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
