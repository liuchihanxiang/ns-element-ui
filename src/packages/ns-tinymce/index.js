import NsEditor from './src'

/* istanbul ignore next */
NsEditor.install = function (Vue) {
  Vue.component(NsEditor.name, NsEditor)
}

export default NsEditor
