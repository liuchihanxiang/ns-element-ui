import NsForm from './packages/ns-form'
import NsTable from './packages/ns-table'
import NsDialog from './packages/ns-dialog'
import NsDrawer from './packages/ns-drawer'
import NsEditor from './packages/ns-tinymce'
import NsNumberRange from './packages/ns-number-range'
import NsSelect from './packages/ns-select'
import NsCheckbox from './packages/ns-checkbox'
import NsRadio from './packages/ns-radio'
import NsGrid from './packages/ns-grid'
import NsImport from './packages/ns-import'
// import NsContainer from './packages/ns-container'
const components = [
  NsForm,
  NsTable,
  NsDialog,
  NsDrawer,
  NsEditor,
  NsNumberRange,
  NsSelect,
  NsCheckbox,
  NsRadio,
  NsGrid,
  NsImport,
  // NsContainer
]

const install = function (Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component)
  })
  let defaultOpts = {
    size: 'medium',
    isInternational: false,
    showSearchForm: true,
    httpMethod: 'post',
    reserveSelection: false,
    operationsConfig: {},
    dataFieldConfig: {},
    tableParams: {
    },
    nsFormDefault: {
      dateValueFormat: 'yyyy-MM-dd',
      dateFormat: 'yyyy-MM-dd',
      dicLabelKey: 'label',
      dicValueKey: 'value'
    }
  }
  Vue.prototype.$NS = Object.assign({}, defaultOpts, opts)
}
// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
