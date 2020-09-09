export default {
  methods: {
    // 回显选中行
    toggleRowSelection (list) {
      let key = this.rowKey || 'id'
      if (!(list instanceof Array)) {
        list = [list]
      }
      if (list.length > 0) {
        this.$nextTick(() => {
          this.currentData.forEach(item => {
            if (list.includes(item[key])) {
              this.$refs.elBaseTable.toggleRowSelection(item)
            }
          })
        })
      }
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
