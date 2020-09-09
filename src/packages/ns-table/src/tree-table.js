'use strict'
// import Vue from 'vue'
export default function treeToArray (data, expandAll, parent = null, level = null) {
  let tmp = []
  Array.from(data).forEach(record => {
    if (record._expanded === undefined) {
      this.$set(record, '_expanded', expandAll)
    }
    let _level = 1
    if (level !== undefined && level !== null) {
      _level = level + 1
    }
    this.$set(record, '_level', _level)
    // 如果有父元素
    if (parent) {
      this.$set(record, 'parent', parent)
    }
    tmp.push(record)
    if (record[this.treeChildrenKey] && record[this.treeChildrenKey].length > 0) {
      const children = treeToArray.apply(this, [record[this.treeChildrenKey], expandAll, record, _level])
      tmp = tmp.concat(children)
    }
  })
  return tmp
}
