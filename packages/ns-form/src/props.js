export default {
  type: String,
  // 是否支持国际化
  isInternational: {
    type: Boolean
  },
  value: {
    type: Object,
    default: function () {
      return {}
    }
  },
  // 用于控制该表单内组件的尺寸
  size: {
    type: String,
    default: 'medium',
    validator: function (value) {
      return ['medium', 'small', 'mini'].indexOf(value) !== -1
    }
  },
  // 行内表单模式
  inline: {
    type: Boolean,
    default: false
  },
  // 表单集合
  formList: {
    type: Array,
    required: true,
    default: () => []
  },
  // 表单域标签的位置
  labelPosition: {
    type: String,
    default: 'right'
  },
  // 表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值
  labelWidth: {
    type: Number,
    default: 80
  },
  // 表单域标签的后缀
  labelSuffix: {
    type: String
  },
  // 是否在输入框中显示校验结果反馈图标
  statusIcon: {
    type: Boolean,
    default: true
  },
  // 是否以行内形式展示校验信息
  inlineMessage: {
    type: Boolean,
    default: false
  },
  // 表单column 是否为混合类型
  isColumnMixins: {
    type: Boolean,
    default: false
  },
  // 是否显示校验错误信息
  showMessage: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  validateOnRuleChange: {
    type: Boolean,
    default: true
  },
  submitBtn: {
    type: Object,
    default: function () {
      return {}
    }
  },
  dicData: {
    type: Object,
    default: function () {
      return {}
    }
  },
  dicUrl: String,
  searchSize: {
    type: String,
    validator: function (value) {
      return ['medium', 'small', 'mini'].indexOf(value) !== -1
    }

  },
  resetBtn: {
    type: Object,
    default: function () {
      return {}
    }
  },
  searchBtn: {
    type: Object,
    default: function () {
      return {}
    }
  },
  // 提交前 处理form表单数据的钩子
  formFormat: Function,
  // 提交处理
  handlerSubmit: Function
}
