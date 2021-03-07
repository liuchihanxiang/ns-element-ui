export const tableProps = {
  treeLoad: Function,
  toolbar:{
    type:Object,
    default:()=>{
      return {
        zoom:false,
        custom:false
      }
    }
  },
  lazy: {
    type: Boolean,
    default: false
  },
  // eslint-disable-next-line key-spacing
  treeProps:Object,
  expandAll: {
    type: Boolean,
    default: false
  },
  uniqueId: {
    type: String,
    default: 'id'
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
