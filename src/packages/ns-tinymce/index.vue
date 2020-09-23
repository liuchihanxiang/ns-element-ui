<template>
  <div class="ns-editor">
    <Editor :id="id" v-model="content" :disabled="disabled" :init="editorInit" />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import { toolbar, plugins, fontsizeFormats, fontFormats, contentStyle } from './config.js'
export default {
  name: 'NsEditor',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: '',
    },
    init: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  components: {
    Editor,
  },
  data() {
    return {
      id: 'tinymce-' + new Date().getTime(),
      content: this.value,
      defaultEditorInit: {
        menubar: false,
        force_p_newlines: false,
        importcss_append: true,
        toolbar,
        plugins,
        fontsize_formats: fontsizeFormats,
        font_formats: fontFormats,
        content_style: contentStyle,
        tabfocus_elements: ':prev,:next',
        language: 'zh_CN',
        elementpath: false, // 隐藏底栏的元素路径
        branding: false,
        min_width: 700,
        min_height: 350,
        ax_wordlimit_num: 1000,
        toolbar_mode: 'sliding',
        removed_menuitems: 'image',
      },
    }
  },
  computed: {
    editorInit() {
      let obj = {}
      if (this.type === 'simple') {
        obj = {
          toolbar: 'fullscreen preview | fontsizeselect | fontselect | forecolor | backcolor | alignleft aligncenter alignright bullist numlist | bold  italic  underline |',
          plugins: 'fullscreen  preview lists advlist',
          min_width: 300,
          min_height: 100,
        }
      }
      return Object.assign({}, this.defaultEditorInit, obj, this.init)
    },
  },
  watch: {
    content(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.content = val
    },
  },
  created() {
    tinymce.init({}) //eslint-disable-line
  },
  destroyed() {},
}
</script>
