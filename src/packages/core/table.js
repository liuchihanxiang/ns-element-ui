import { isExist } from './../../utils/index'

export default {
  provide() {
    return {
      table: this
    }
  },
  props: {
    isInternational: {
      type: Boolean
    },
    btnListAlone: {
      type: Boolean,
      default: false
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
    btnList: {
      type: Array,
      default: () => []
    },
    fetch: Function,
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
    size: {
      type: String,
      validator: function (value) {
        return ['medium', 'small', 'mini'].indexOf(value) !== -1
      }
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
    }
  },
  methods: {

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
        dropdownDefaultShowNum: 2,
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
    }
  }
}
