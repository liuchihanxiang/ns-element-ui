
import VueHighlightJS from 'vue-highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

import nsElementUi from '../../src/index.js'
import "../../src/styles/index.scss"
import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'
import elDragDialog from './directive/el-drag-dialog'

export default ({
  Vue,
  options,
  router
}) => {
  Vue.use(VueHighlightJS)
  Vue.use(elDragDialog)
  Vue.use(Element)
  Vue.use(nsElementUi)
}
