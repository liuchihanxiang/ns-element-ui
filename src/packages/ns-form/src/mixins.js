export default {
  methods: {
    getLabel (item, labelKey) {
      let key = item.labelkey || labelKey || this.dicLabelKey
      return this.getInternationalValue(item[key])
    },

    getValue (item, column) {
      let { isValueObject, valueKey } = column
      valueKey = valueKey || this.dicValueKey
      if (isValueObject) {
        return item
      } else {
        return item[valueKey]
      }
    },

    getPlaceholder (type, column) {
      let selectTypeList = ['select', 'cascader']
      let text = selectTypeList.includes(column.type) ? '请选择' : '请输入'
      if (column.noPreText) { text = '' }
      if (type === 'searchForm') { text = '' }
      let placeholder = (type === 'searchForm' || this.placeholder) ? (column.placeholder || text + column.label) : column.placeholder ? (text + column.placeholder) : ''
      return this.getInternationalValue(placeholder || '')
    },

    getCascaderProps({ props, valueKey, labelKey, codeKey, levelkey, superCodeVal, parentCodeKey, url, beforeHttp, dataPath, beforeResolve, leafKey, lastLevel }) {
      codeKey = codeKey || 'code'
      superCodeVal = superCodeVal || '0'
      parentCodeKey = parentCodeKey || 'parentCode'
      valueKey = valueKey || 'value'
      labelKey = labelKey || 'name'
      dataPath = dataPath || 'data.list'
      levelkey = levelkey || 'level'
      leafKey = leafKey || 'leaf'
      let lazyLoad = (node, resolve) => {
        const { level, data } = node
        const parentCode = (data && data[codeKey]) || superCodeVal
        let params = { level, parentCode }
        if (beforeHttp) { params = beforeHttp(params) }
        this.$http.post(url, params).then(res => {
          let list = []
          if (beforeResolve) {
            list = beforeResolve(res, node, { props, valueKey, labelKey, codeKey, levelkey, superCodeVal, parentCodeKey, url, beforeHttp, dataPath, beforeResolve, leafKey, lastLevel })
          } else {
            list = this.getValueByPath(res, dataPath)
            if (lastLevel) {
              list.forEach(item => {
                item.leaf = item[levelkey] === lastLevel
              })
            }
          }
          resolve(list)
        })
      }
      let lazy = props && props.lazy !== undefined ? props.lazy : true
      let multiple = props && props.multiple !== undefined ? props.multiple : false
      let checkStrictly = props && props.checkStrictly !== undefined ? props.checkStrictly : false
      return {
        lazy: lazy,
        value: valueKey,
        label: labelKey,
        leaf: leafKey,
        multiple: multiple,
        lazyLoad: lazy ? lazyLoad : undefined,
        checkStrictly
      }
    },
    /**
     * 获取字典数据，字典数据分为两种 一种存在前端可以直接拿到，另一种存在后台需要请求拿回数据
     * 前台字典数据
     */
    getAllDic () {
      return new Promise(resolve => {
        let result = [] // 存放请求数据字典的序列函数
        let dicList = {} // 存获取的数据字典的集合
        let locaDic = this.dicData || {} // 前端数据字典集合
        let list = this.dickeyList // 当前表单中 数据字典后端地址或前台key值的集合
        // if (!this.notEmptyArray(list)) {
        //   return
        // }
        list.forEach(item => {
          result.push(
            new Promise((resolve, reject) => {
              if (item && typeof item === 'string') {
                resolve(locaDic[item])
              }
            })
          )
        })
        // 循环list 为key时直接前台获取返回  为url时再去通过地址请求数据 后 返回
        this.dicUrlList.forEach(ele => {
          result.push(
            new Promise((resolve, reject) => {
              if (ele.url && typeof ele.url === 'string') {
                list.push(ele.dicKey)
                let dicUrl = this.dicUrl ? this.dicUrl + '/' + ele.url : ele.url
                let ajaxData = ele.ajaxData || null
                let method = ele.method || 'get'
                let listKey = ele.listKey || 'data.list'
                this.getDicItem(dicUrl, ajaxData, method, listKey).then(
                  function (res) {
                    resolve(res)
                  }
                )
              }
            })
          )
        })
        Promise.all(result).then(data => {
          list.forEach((ele, index) => {
            dicList[ele] = data[index]
          })
          resolve(dicList)
        })
      })
    },
    autocompleteFetchSuggestions(queryString, callback, column) {
      if (column.fetchSuggestions && this.isFunction(column.fetchSuggestions)) {
        return column.fetchSuggestions(queryString, callback)
      } else if (column.url) {
        return ((queryString, callback) => {
          let key = column.fetchKey || 'name'
          let params = {
            [key]: queryString,
            ...(column.params || {})
          }
          if (queryString !== '') {
            this.$http.post(column.url, params).then(res => {
              let listKey = column.listKey || 'data'
              let list = this.getValueByPath(res, listKey)
              if (column.beforeCB) {
                list = column.beforeCB(list)
              }
              callback(list)
            })
          } else { // eslint-disable-next-line
            callback([])
          }
        })(queryString, callback)
      }
    },

    pickerOptions(column) {
      let disabledDate = null
      if (column.dateRange) {
        disabledDate = (time) => {
          if (column.dateRange === 'future') {
            return time.getTime() < new Date().getTime()
          } else {
            return time.getTime() > new Date().getTime()
          }
        }
      }
      let pickerOptions = column.pickerOptions || {}
      return Object.assign({}, { disabledDate }, pickerOptions)
    },

    // 获取单个后台数据字典的方法
    getDicItem (url, ajaxData, method, listKey) {
      return new Promise((resolve, reject) => {
        this.$http({
          url: url,
          method: method,
          data: ajaxData
        }).then(res => {
          const list = this.getValueByPath(res, listKey)
          if (list) {
            resolve(list instanceof Array ? list : [])
          } else {
            resolve([])
          }
        })
      })
    },

    /*
     * 针对table操作中的表单和上方查询表单划分
     * 不声明option.type==='minxin'的时候默认为一般表单，全部渲染
     * 当声明为minxin的时候表示该表单为 表格上方查询表单 和 新增或创建等表格操作另外一个表单的  混合表单
     * 当为混合表单时会根据isSearch和isNormal去区分，公用的两个都不声明即可，某个单独用的声明另一个为false即可
     */
    filterFormList (list) {
      let arr = []
      // 表格上方查询表单
      if (!this.mixins) {
        return list
      }
      if (list && list.length) {
        list.forEach(ele => {
          let isBothUndefined =
          ele.isNormal === undefined && ele.isSearch === undefined
          if (this.type === 'searchForm') {
            if (isBothUndefined || !ele.isNormal) {
              arr.push(ele)
            }
          } else {
            if (isBothUndefined || !ele.isSearch) {
              arr.push(ele)
            }
          }
        })
      }
      return arr
    },

    // 表单数据初始化
    setDefaultFormModel (list) {
      let slotTypeList = ['slot', 'outItemSlot']
      // 表格上方查询表单
      list.forEach(ele => {
        if (ele.prop || slotTypeList.includes(ele.type)) {
          if (
            ele.type === 'checkbox' ||
            (ele.type === 'select' && ele.multiple) ||
            ele.type === 'datetimerange' ||
            ele.type === 'daterange'
          ) {
            this.defaultFormModel[ele.prop] = []
          } else if (
            slotTypeList.includes(ele.type) &&
            ele.form &&
            JSON.stringify(ele.form) !== '{}'
          ) {
            Object.keys(ele.form).forEach(key => {
              this.defaultFormModel[key] = ele.form[key]
            })
          } else {
            this.defaultFormModel[ele.prop] = ''
          }
          if (ele.default !== undefined) {
            this.defaultFormModel[ele.prop] = ele.default
          }
        }
      })
    },

    // 从value中赋值给form
    setFormVal () {
      if (JSON.stringify(this.value) === '{}') {
        this.formModel = JSON.parse(JSON.stringify(this.defaultFormModel))
      } else if (this.value) {
        Object.keys(this.value).forEach(key => {
          if (
            this.defaultFormModel[key] !== undefined &&
            this.value[key] !== null &&
            this.value[key] !== undefined
          ) {
            this.formModel[key] = this.value[key]
          }
        })
      }
    }
  }
}
