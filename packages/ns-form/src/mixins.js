export default {
  methods: {
    getLabel (item, labelKey) {
      let key = item.labelkey || labelKey || 'label'
      return this.getInternationalValue(item[key])
    },
    getValue (item, column) {
      let { isValueObject, valueKey } = column
      valueKey = valueKey || 'value'
      if (isValueObject) {
        return item
      } else {
        return item[valueKey]
      }
    },
    // 处理国际化
    getInternationalValue (value) {
      return this.isFormInternational ? this.$t(value) : value
    },
    getPlaceholder (type, column) {
      var placeholder = type === 'searchForm' ? column.placeholder || column.label : column.placeholder
      return this.getInternationalValue(placeholder)
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
                let listKey = ele.listKey || 'data'
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
      if (!this.isColumnMixins) {
        return list
      }
      list.forEach(ele => {
        let isBothUndefined = ele.isNormal === undefined && ele.isSearch === undefined
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
      return arr
    },
    // 表单数据初始化
    setDefaultFormModel (list) {
      let slotTypeList = ['solt', 'outItemSlot']
      // 表格上方查询表单
      list.forEach(ele => {
        if (ele.prop || slotTypeList.includes(ele.type)) {
          if (
            ele.type === 'checkbox' || (ele.type === 'select' && ele.multiple) || ele.type === 'datetimerange' || ele.type === 'daterange'
          ) {
            this.defaultFormModel[ele.prop] = []
          } else if (
            slotTypeList.includes(ele.type) && ele.form && JSON.stringify(ele.form) !== '{}'
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
      } else {
        Object.keys(this.value).forEach(key => {
          if (
            this.defaultFormModel[key] !== undefined && this.value[key] !== null && this.value[key] !== undefined
          ) {
            this.formModel[key] = this.value[key]
          }
        })
      }
    }
  }
}
