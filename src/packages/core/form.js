export default {
  props: {
    labelKey: {
      type: String,
      default: null
    },
    valueKey: {
      type: String,
      default: null
    }
  },
  computed: {
    dicLabelKey() {
      return this.labelKey || this.$NS.nsFormDefault.dicLabelKey || 'label'
    },
    dicValueKey() {
      return this.valueKey || this.$NS.nsFormDefault.dicValueKey || 'value'
    }
  }
}
