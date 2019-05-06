import SwitchLanguage from './src'

/* istanbul ignore next */
SwitchLanguage.install = function (Vue) {
  Vue.component(SwitchLanguage.name, SwitchLanguage)
}

export default SwitchLanguage
