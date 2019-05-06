import NsTable from './src'

/* istanbul ignore next */
NsTable.install = function (Vue) {
  Vue.component(NsTable.name, NsTable)
}

export default NsTable
