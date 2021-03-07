export default {
  props: {
    isInternational: Boolean,
    visible: {
      type: Boolean,
      default: false
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    showFullScreen: {
      type: Boolean,
      default: false
    },
    footer: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '创建'
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    customClass: {
      type: String,
      default: ''
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    area: {
      type: [Array, String],
      default: () => ['800', 'auto']
    },
    beforeClose: Function, // eslint-disable-line
    width: {
      type: String,
      default: '800px'
    },
    top: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: 'auto'
    },
    cancelBtn: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    confirmBtn: {
      type: Boolean,
      default: true
    }  },
  computed: { }
}
