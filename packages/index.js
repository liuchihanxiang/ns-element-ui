import NsForm from './ns-form'
import NsTable from './ns-table'
import NsDialog from './ns-dialog'
import SwitchLanguage from './switch-language'
import Breadcrumb from './breadcrumb'
import ScrollPane from './scroll-pane'
import SvgIcon from './svg-icon'
const components = [
  NsForm,
  NsTable,
  NsDialog,
  SwitchLanguage,
  Breadcrumb,
  ScrollPane,
  SvgIcon
]

const install = function (Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component)
  })
  let defaultOpts = {
    isInternational: false,
    operationsOnlyShowIcon: true,
    showSearchForm: true,
    listField: 'data.data',
    pageSizeKey: 'pageSize',
    pageIndexKey: 'currentPage',
    totalField: 'data.total',
    ajaxMethod: 'post'
  }
  Vue.prototype.$NS = Object.assign({}, defaultOpts, opts)
}
// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
