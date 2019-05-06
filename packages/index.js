import NsForm from './ns-form'
import NsTable from './ns-table'
import NsDialog from './ns-dialog'
import SwitchLanguage from './switch-language'
import Breadcrumb from './breadcrumb'
import ScrollPane from './scroll-pane'
const components = [NsForm, NsTable, NsDialog, SwitchLanguage, Breadcrumb, ScrollPane]

const install = function (Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component)
  })
  Vue.prototype.$NS = {
    isInternational: opts.isInternational || false,
    operationsOnlyShowIcon: opts.operationsOnlyShowIcon || true,
    showSearchForm: opts.showSearchForm || true
  }
}

export default install
