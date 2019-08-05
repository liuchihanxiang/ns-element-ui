export default {
  methods: {
    // 处理国际化
    getInternationalValue (value) {
      return this.isTableInternational ? this.$t(value) : value
    },

    // 刷新表格
    handlerRefresh () {
      this.isTreeStatus = true // 刷新时保留树形状态
      this.initData(this.searchFormModel)
    },

    // 重置查询form表单
    handlersearchFormReset () {
      this.$refs.serchForm.handlerReset()
    },

    // 切换form表单的状态
    handlersearchForm () {
      // showSearchForm
      this.isShow = !this.isShow
    },

    // 过滤要展示的列
    showClomnuInit: function () {
      this.columns.forEach((ele, index) => {
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

    // 保存树形状态
    saveTreeStateToCookies (data) {
      let cookiesArr = []
      data.forEach(v => {
        if (v._expanded) {
          cookiesArr.push(v[this.rowKey])
        }
      })
      window.sessionStorage.setItem(this.tableId, JSON.stringify(cookiesArr))
    },

    getAlignStyle (align, columnIndex) {
      if (this.treeTable && !align) {
        return 'left'
      } else if (!this.treeTable && !align) {
        return 'center'
      } else {
        return align
      }
    },

    // 获取所选数据 跨分页
    getSelectData () {
      return this.selection
    },

    // 表格行checkbox变化
    selectionChange (selection) {
      this.selection = this.$refs.elBaseTable.selection
      this.emitEventHandler('selection-change', selection)
    },

    // 清空所选
    clearSelect () {
      this.$refs['elBaseTable'].clearSelection()
    },

    // 清空表格数据
    clearTableData () {
      this.currentData = []
    }
  }
}
