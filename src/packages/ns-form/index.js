import NsForm from './src'

/* istanbul ignore next */
NsForm.install = function (Vue) {
  Vue.component(NsForm.name, NsForm)
}

export default NsForm
