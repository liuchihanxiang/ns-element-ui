import NsDialog from './src'

/* istanbul ignore next */
NsDialog.install = function (Vue) {
  Vue.component(NsDialog.name, NsDialog)
}

export default NsDialog
