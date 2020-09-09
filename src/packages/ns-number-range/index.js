import NsNumberRange from './src'

/* istanbul ignore next */
NsNumberRange.install = function (Vue) {
  Vue.component(NsNumberRange.name, NsNumberRange)
}

export default NsNumberRange
