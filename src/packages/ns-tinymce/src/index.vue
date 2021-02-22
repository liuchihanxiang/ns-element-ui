<template>
  <div class="ns-editor">
    <ul v-if="labelList.length"
      class="label">
      <li v-for="(item,index) in labelList"
        @click="insertEditor(index,item)"
        :key="index">{{item.label||item}}</li>
    </ul>
    <Editor :id="id"
      ref="editor"
      v-model="content"
      :disabled="disabled"
      :init="editorInit" />
  </div>
</template>

<script>
import uniqueId from 'lodash/uniqueId'
import Editor from '@tinymce/tinymce-vue'

import { toolbar, plugins, fontsizeFormats, fontFormats, contentStyle, blockFormats } from './config.js'
export default {
  name: 'NsEditor',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    labelList: {
      type: Array,
      default: () => []
    },
    init: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  components: {
    Editor
  },
  data() {
    return {
      id: uniqueId('tinymce'),
      content: this.value,
      defaultEditorInit: {
        menubar: false,
        force_p_newlines: false,
        importcss_append: true,
        toolbar,
        plugins,
        placeholder: this.placeholder,
        fontsize_formats: fontsizeFormats,
        font_formats: fontFormats,
        content_style: contentStyle,
        paste_data_images: true,
        convert_urls: false,
        block_formats: blockFormats,
        tabfocus_elements: ':prev,:next',
        language: 'zh_CN',
        elementpath: false, // 隐藏底栏的元素路径
        branding: false,
        min_width: 700,
        min_height: 350,
        ax_wordlimit_num: 40,
        toolbar_mode: 'sliding',
        removed_menuitems: 'fullscreen,preview'
      },
      colorList: ['#F3704D', '#39E7CC', '#1C92E4', '#94D857', '#18D413', '#F3AB4D', '#EDD252']
    }
  },
  methods: {
    insertEditor(index, item) {
      let $editor = this.$refs.editor
      let itemColor = this.colorList[index % this.colorList.length]
      $editor.editor.insertContent(`<span class="mceNonEditable" style="background-color:${itemColor};">${item.label || item}</span>`)
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
          min_height: 100
        }
      }
      return Object.assign({}, this.defaultEditorInit, obj, this.init)
    }
  },
  watch: {
    content(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
    value(val) {
      this.content = val
    }
  },
  created() {
    tinymce.init({}) //eslint-disable-line
  },
  destroyed() {}
}
</script>
