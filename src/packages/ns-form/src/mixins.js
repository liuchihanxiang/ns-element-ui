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
      let placeholder = (type === 'searchForm' || this.placeholder) ? (column.placeholder || text + column.label) : column.placeholder ? (column.placeholder) : ''
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
            ele.type === 'daterange'  ||
            ele.type === 'numberRange'
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
            if(ele.type === 'upload'){
              this.uploadProp = ele.prop
            }
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
        this.changeFiles([])
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
      let imgList = []
      if(this.uploadProp && this.value[this.uploadProp]){
        imgList.push({ name: this.value[this.uploadProp], url: '/website/' + this.value[this.uploadProp] + '?' + new Date().valueOf() })
      }
      this.changeFiles(imgList)
    },

    
    // 删除图片
    handleRemoveImg() {
      this.imgList = []
      this.changeFiles([])
    },
    
    // 上传组件挂载后 如果有图片回显隐藏添加图片模块
    handleUploadMounted() {
      const $actionEle = this.$refs['img'][0].$el.getElementsByClassName('el-upload')[0]
      if (this.imgList.length) {
        $actionEle.style.display = 'none'
      }
    },

    // change选择图片
    changeFiles(fileList,column) {
      let fileList1 = JSON.parse(JSON.stringify(fileList))
      // 第一个split是处理文件后缀的
      // 第二个split是处理编辑时，回显的参数
      let fileName = fileList1[0] ? fileList1[0].name.split('?')[0].split('.') : []
      fileName = fileName.length ? fileName.pop().toLocaleLowerCase() : []

      let msg1 = column && column.msg1 ? column.msg1 : '照片要求格式为jpg、jpeg或png'
      let msg2 = column && column.msg2 ? column.msg2 : '图片大小：不超过300Kb；图片尺寸：1920px * 320px（宽*高）。'
      let fileSize = column &&  column.size ? column.size :300
      let fileType = ['png', 'jpeg', 'jpg']
      if (fileName.length && !fileType.includes(fileName)) {
        this.$message({
          message: msg1,
          type: 'error'
        })
        this.handleRemoveImg()
        return false
      } else {
        if (fileList[0] && fileList[0].size / 1024 > fileSize) {
          this.$message({
            message: msg2,
            type: 'error'
          })
          this.handleRemoveImg()
          return false
        } else {
          this.imgList = fileList
        }
      }
      if (this.$refs['img']) {
        const $actionEle = this.$refs['img'][0].$el.getElementsByClassName('el-upload')[0]
        $actionEle.style.display = fileList.length === 1 ? 'none' : 'block'
      }
    },

    formDataParam(){
      let copyValue = JSON.parse(JSON.stringify(this.value))
      let uploadFiles = this.$refs.img[0].uploadFiles
      let imgFile = uploadFiles[0] ? uploadFiles[0].raw:''
      let data = this.beforeFormData ? this.beforeFormData(copyValue) : copyValue

      if(data){
        console.log
        var form = new FormData()
        imgFile && form.append(this.uploadProp, imgFile)

        Object.keys(data).forEach((key) => {
          if (data[key] instanceof Array) {
            data[key].forEach((item, index) => {
              Object.keys(item).forEach((cKey, cIndex) => {
                form.append(`${key}[${index}].${cKey}`, item[cKey])
              })
            })
          } else {
            form.append(key, data[key])
          }
        })
        return form
      }
    }
  }
}
