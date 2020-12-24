import { isExist, getValueByPath } from './../../utils/index'
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
  data() {
    return {
      total: 0,
      page: 1,
      pageSize: 10,
      selectKey: '',
      searchFormModel: {},
      lastSearchModel: {},
      currentData: [],
      cachData: [],
      selection: []
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
    },

    // 切换每页显示
    handleSizeChange(size) {
      this.pageSize = size
      this.initData(this.searchFormModel)
    },

    // 处理国际化
    getInternationalValue(value) {
      return this.isTableInternational ? this.$t(value) : value
    },

    // 刷新表格
    handlerRefresh() {
      this.initData(this.searchFormModel)
    },
    // 重置查询form表单
    handlersearchFormReset() {
      this.$refs.serchForm && this.$refs.serchForm.handlerReset()
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
      this.lastSearchModel = JSON.parse(JSON.stringify(this.searchFormModel))
      if (this.url && this.search === 'server') {
        this.initData(this.searchFormModel)
      } else {
        this.filterData()
      }
    },
    // 请求数据
    initServe(formParams = {}) {
      this.loading = true
      let tableParams = this.$NS.tableParams
      let { fetch, url, $http, pagination, realDataFieldConfig, sidePagination, page, pageSize, queryParams, httpMethod } = this
      let params = {} // 请求参数
      let copyFormParams = JSON.parse(JSON.stringify(formParams))
      let obj = Object.assign(copyFormParams, tableParams)
      // 请求之前处理参数
      if (queryParams && typeof queryParams === 'function') {
        params = queryParams(obj, copyFormParams)
      } else if (queryParams && typeof queryParams === 'object') {
        params = Object.assign(queryParams, copyFormParams)
      } else {
        params = obj
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
        .then((res) => {
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
        .catch((error) => {
          this.loading = false
          console.log(error) /*eslint-disable-line*/
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
      //  数据从哪里拿前台还是后台
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
    }
  },

  watch: {
    tableData: {
      handler(val, oldVal) {
        if (typeof oldVal !== 'undefined') {
          this.initData(this.searchFormModel)
        }
      },
      immediate: true
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

  },
  mounted() {
    this.initData(this.searchFormModel)
  }
}
