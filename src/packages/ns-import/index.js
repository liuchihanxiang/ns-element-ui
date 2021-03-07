import NsImport from './src'

/* istanbul ignore next */
NsImport.install = function (Vue) {
  Vue.component(NsImport.name, NsImport)
}

export default NsImport
