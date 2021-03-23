<!--  -->
<template>
  <el-dialog ref="ns-dialog"
    :title="getInternationalValue(title)"
    :visible.sync="show"
    @close="$emit('close')"
    @closed="closed"
    :show-close="showClose"
    :custom-class="customClass"
    :destroy-on-close="destroyOnClose"
    :append-to-body="appendToBody"
    :close-on-press-escape="closeOnPressEscape"
    :close-on-click-modal="closeOnClickModal"
    :before-close="beforeClose"
    :lock-scroll="lockScroll"
    :modal="modal"
    v-el-drag-dialog
    :class="{'ns-dialog--center':isCenter,'ns-dialog ns-scroll-dialog':true}"
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
import dialogMixins from '../../core/dialog'

import throttle from 'lodash/throttle'
export default {
  name: 'NsDialog',
  mixins: [dialogMixins],
  props: {},
  watch: {
    visible: {
      immediate: true,
      handler: function (val) {
        this.show = val
        if (val) {
          this.$nextTick(() => {
            if (this.$refs.myScrollbar && this.$refs.myScrollbar.wrap) {
              this.$refs.myScrollbar.wrap.scrollTop = 0
            }
          })
        }
      }
    },
    closeOnClickModal: {
      immediate: true,
      handler: function (val) {
        console.log(val)
      },
      deep: true
    },
    showClose: {
      immediate: true,
      handler: function (val) {
        console.log(val)
      },
      deep: true
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
      $dialog.style.height = height
      $dialog.style.width = width
      $dialog.style.marginTop = marginTop
      $dialog.style.top = 'auto'
      $dialog.style.left = 'auto'
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
    getInternationalValue
  },

  mounted() {
    if (this.top) {
      this.isCenter = false
    } else {
      this.isCenter = true
    }
    this.initDialogSize()
  },

  computed: {
    // 是否国际化
    international() {
      return isExist(this.isInternational) ? this.isInternational : this.$NS.isInternational
    }
  }
}
</script>
