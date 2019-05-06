import ScrollPane from './src'

/* istanbul ignore next */
ScrollPane.install = function (Vue) {
  Vue.component(ScrollPane.name, ScrollPane)
}

export default ScrollPane
