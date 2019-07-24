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

    // 切换下级是否展开
    toggleExpanded: function (trIndex) {
      this.isTreeStatus = false
      const record = this.formatData[trIndex]
      record._expanded = !record._expanded
    },

    // 图标显示
    iconShow (index, record) {
      return (
        index === this.treeCtrlIndex &&
        record[this.treeChildrenKey] &&
        record[this.treeChildrenKey].length > 0
      )
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
    // 显示子级
    showRow: function (row) {
      let show = true
      if (row.row.parent) {
        show = row.row.parent._expanded && row.row.parent._show
      }
      row.row._show = show
      if (show) {
        return 'animation:treeTableShow 0.5s;-webkit-animation:treeTableShow 0.5s;'
      } else {
        return 'display:none;'
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

    setSelect (data) {
      // this.selectData = data
    },

    // 清空所选
    clearSelect () {
      this.$refs['elBaseTable'].clearSelection()
    },

    // 清空表格数据
    clearTableData () {
      this.currentData = []
    },

    /**
                                *触发表格选中行
                                *@param {*} list 要选中的行唯一标识的list
                                */
    toggleRowSelection (list) {
      let key = this.rowKey || 'id'
      if (!(list instanceof Array)) {
        list = [list]
      }
      if (list.length > 0) {
        this.$nextTick(() => {
          this.formatData.forEach(item => {
            if (list.includes(item[key])) {
              this.$refs.elBaseTable.toggleRowSelection(item)
            }
          })
        })
      }
    },

    // 展开当前节点所有的父节点
    expandAllParents (tem, parentIds) {
      parentIds.forEach(v => {
        for (let i = 0; i < tem.length; i++) {
          if (tem[i].id === v) {
            tem[i]._expanded = true
            if (tem[i].parentId && tem[i].parentId !== 0) {
              this.expandAllParents(tem, [tem[i].parentId])
            }
            break
          }
        }
      })
    }
  }
}
