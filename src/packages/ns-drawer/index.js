import NsDrawer from './src'

/* istanbul ignore next */
NsDrawer.install = function (Vue) {
  Vue.component(NsDrawer.name, NsDrawer)
}

export default NsDrawer
