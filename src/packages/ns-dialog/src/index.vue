<!--  -->
<template>
  <el-dialog ref="ns-dialog"
    :title="getInternationalValue(title)"
    :visible.sync="show"
    @close="$emit('close')"
    @closed="closed"
    :show-close="showClose"
    :custom-class="customClass"
    v-el-drag-dialog
    :destroy-on-close="destroyOnClose"
    :append-to-body="appendToBody"
    :close-on-press-escape="closeOnPressEscape"
    :close-on-click-modal="closeOnClickModal"
    :before-close="beforeClose"
    :class="{'ns-dialog--center':isCenter,'ns-dialog ns-scroll-dialog':true}"
    @hook:mounted="dialogMounted"
    :width="area instanceof Array?area[0]:'auto'">
    <div slot="title">
      <slot name="title">
        <span class="el-dialog__title">{{ title }}</span>
      </slot>
      <button v-if="showFullScreen"
        type="button"
        @click="toggleSize"
        class="el-dialog__headerbtn screen">
        <i :class="fullScreen?'icon iconfont icon-exit-full-screen':'icon iconfont icon-full-screen'" />
      </button>
    </div>
    <el-scrollbar ref="myScrollbar"
      :native="false"
      style="height:100%"
      :noresize="false">
      <slot />
    </el-scrollbar>
    <template slot="footer">
      <slot name="footer">
        <span v-if="footer"
          class="dialog-footer">
          <el-button v-if="confirmBtn"
            type="primary"
            @click="ok">{{getInternationalValue(confirmText)}}</el-button>
          <el-button v-if="cancelBtn"
            @click="$emit('update:visible', false)">{{getInternationalValue(cancelText)}}</el-button>
        </span>
      </slot>
    </template>
  </el-dialog>
</template>

<script>
import { getInternationalValue, isExist } from './../../../utils/index'
import throttle from 'lodash/throttle'
export default {
  name: 'NsDialog',
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
      default: false
    },
    titleSlot: {
      type: Boolean,
      default: false
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
      default: () => ['700', 'auto']
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
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler: function (val) {
        this.show = val
        if (val) {
          this.$nextTick(() => {
            this.initDialogSize()
          })
        }
      }
    }
  },
  data() {
    return {
      show: false,
      isCenter: false,
      fullScreen: false
    }
  },
  methods: {
    toggleSize() {
      this.fullScreen = !this.fullScreen
      if (this.fullScreen) {
        this.setDialogSize({ height: '100%', width: '100%', marginTop: 'auto' })
      } else {
        this.initDialogSize()
      }
    },
    closed() {
      this.$emit('update:visible', false)
      this.$emit('closed')
    },

    ok: throttle(function () {
      this.$emit('ok')
    }, 1000),

    setDialogSize({ height, width, marginTop, top, left }) {
      let $dialogWraps = this.$refs['ns-dialog']
      let $dialog = $dialogWraps.$el.getElementsByClassName('el-dialog')[0]
      if (height === 'auto') {
        $dialog.style.height = $dialog.clientHeight + 15 + 'px'
      } else {
        $dialog.style.height = height
      }
      $dialog.style.width = width
      $dialog.style.marginTop = marginTop
      $dialog.style.top = 'auto'
      $dialog.style.left = 'auto'
      if (this.$refs.myScrollbar.wrap) {
        this.$refs.myScrollbar.wrap.scrollTop = 0
      }
    },

    initDialogSize() {
      let dialogHeight = 'auto'
      let marginTop = 'auto'
      let width = this.area[0] || 'auto'
      if (this.area instanceof Array && this.area.length >= 1) {
        dialogHeight = this.area[1]
      }
      if (this.top) {
        marginTop = this.top
      }
      this.setDialogSize({ height: dialogHeight, width, marginTop })
    },
    dialogMounted() {
      console.log('初始化了又')
    },

    getInternationalValue
  },

  mounted() {
    if (this.top) {
      this.isCenter = false
    } else {
      this.isCenter = true
    }
  },

  computed: {
    // 是否国际化
    international() {
      return isExist(this.isInternational) ? this.isInternational : this.$NS.isInternational
    }
  }
}
</script>
