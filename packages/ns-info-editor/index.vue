<template>
  <div class="components-container">
    <div v-if="labelList.length"
         class="ns-editor-label">
      <el-button type="primary"
                 size="mini"
                 v-for="(item,index) in labelList"
                 :key="index"
                 @click="handleLabel(item.value)"
                 class="editor-label-item">{{item.label}}</el-button>
    </div>
    <ns-editor :value="value"
               v-bind="$attrs"
               v-on="$listeners"
               ref="nsEditor" />

  </div>
</template>

<script>
import NsEditor from './../ns-tinymce'

export default {
  name: 'NsInfoEditor',
  inheritAttrs: false,
  components: {
    NsEditor
  },
  props: {
    value: String,
    editorInit: {
      type: Object,
      default: () => { }
    },
    labelList: {
      type: Array,
      default: () => []
    },
    labelBaseUrl: {
      type: String,
      default: '/infoImg/'
    }

  },
  methods: {
    // 点击标签 插入对应标签图片
    handleLabel (name) {
      let editor = this.$refs.nsEditor
      let currentEditor = editor.$children[0].editor
      let currentImg = this.labelBaseUrl + name.toLowerCase() + '.png'
      currentEditor.insertContent(`<img class="img-mark" data-txt="${name}" src="${currentImg}">`)
    },

    /**
    * 获取内容时 需要将img标签转化为span标签 方便后台替换span内的标识
    */
    imgTotxt () {
      let contentCon = document.createElement('div')
      contentCon.innerHTML = this.content
      let imgList = contentCon.querySelectorAll('.img-mark')
      imgList.forEach(ele => {
        let placeholderText = ele.getAttribute('data-txt')
        let txtNode = document.createElement('span')
        txtNode.innerHTML = placeholderText
        txtNode.className = 'img-mark'
        txtNode.setAttribute('data-txt', placeholderText)
        let pNode = ele.parentNode
        pNode.insertBefore(txtNode, ele)
        pNode.removeChild(ele)
      })
      return contentCon.innerHTML
    },
    /**
     * 回显数据时 需要将span标签转化为img标签 在页面显示
     */
    txtToImg (str) {
      let contentCon = document.createElement('div')
      contentCon.innerHTML = str
      let imgList = contentCon.querySelectorAll('span.img-mark')
      imgList.forEach(ele => {
        let imgName = ele.getAttribute('data-txt')
        let currentImg = this.labelBaseUrl + imgName.toLowerCase() + '.png'
        let img = `<img class="img-mark" data-txt="${name}" src="${currentImg}">`
        let pNode = ele.parentNode
        pNode.insertBefore(img, ele)
        pNode.removeChild(ele)
      })
      return contentCon.innerHTML
    }

  }

}
</script>
