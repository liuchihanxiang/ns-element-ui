<template>
  <div>
    <Editor :id='id'
            v-model="content"
            :disabled="false"
            :init="editorInit" />

  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import { toolbar, plugins, fontsizeFormats, fontFormats, contentStyle, styleFormats } from './config.js'
export default {
  name: 'NsEditor',
  inheritAttrs: false,
  props: {
    value: String,
    init: Object
  },
  components: {
    Editor
  },

  data () {
    return {
      id: 'tinymce-' + new Date().getTime(),
      content: this.value,
      defaultEditorInit: {
        skins: 'o2k7',
        theme: 'modern',
        menubar: false,
        force_p_newlines: false,
        importcss_append: true,
        toolbar,
        plugins,
        fontsize_formats: fontsizeFormats,
        font_formats: fontFormats,
        content_style: contentStyle,
        style_formats: styleFormats,
        tabfocus_elements: ':prev,:next',
        language: 'zh_CN',
        height: 300
      }
    }
  },
  methods: {

  },
  computed: {
    editorInit () {
      return Object.assign({}, this.defaultEditorInit, this.init)
    }
    // tinymceHtml () {
    //   return this.value
    // }
  },
  watch: {
    content (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.content = val
    }

  },
  created () {

  },
  mounted () {
    tinymce.init({}) //eslint-disable-line
  }
}
</script>
