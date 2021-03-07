import NsContainer from './src'

/* istanbul ignore next */
NsContainer.install = function (Vue) {
  Vue.component(NsContainer.name, NsContainer)
}

export default NsContainer
