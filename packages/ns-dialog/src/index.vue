<!--  -->
<template>
  <el-dialog
    v-el-drag-dialog
    ref="ns-dialog"
    :title="getInternationalValue(title)"
    :visible.sync="show"
    @close="$emit('close')"
    @closed="closed"
    :show-close="showClose"
    :destroy-on-close="destroyOnClose"
    :append-to-body="appendToBody"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :class="{'ns-dialog--center':isCenter}"
    :width="area instanceof Array?area[0]:area"
  >
    <template slot="title">
      <slot name="title" />
    </template>
    <slot />
    <template slot="footer">
      <slot name="footer">
        <span class="dialog-footer">
          <el-button v-if="yesBtn" type="primary" @click="ok">{{getInternationalValue(confirmText)}}</el-button>
          <el-button v-if="cancelBtn" @click="$emit('update:visible', false)">{{getInternationalValue(cancelText)}}</el-button>
        </span>
      </slot>
    </template>
  </el-dialog>
</template>

<script>
import * as utils from './../../utils/index'
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
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '创建'
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    area: {
      type: [Array, String],
      default: () => ['auto', 'auto']
    },
    // eslint-disable-next-line vue/require-default-prop
    beforeClose: Function,
    width: {
      type: String,
      default: '800px'
    },
    // eslint-disable-next-line vue/require-default-prop
    top: {
      type: String
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
    yesBtn: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler: function(val) {
        this.show = val
      }
    }
  },
  data() {
    return {
      show: false,
      isCenter: false
    }
  },
  methods: {
    closed() {
      this.$emit('update:visible', false)
      this.$emit('closed')
    },
    ok: throttle(function() {
      this.$emit('ok')
    }, 1000),
    // 初始化工具方法
    initUtils() {
      Object.keys(utils).forEach(key => {
        this[key] = utils[key]
      })
    }
  },
  mounted() {
    let dialogHeight
    let $dialogWraps = this.$refs['ns-dialog']
    let $dialog = $dialogWraps.$el.getElementsByClassName('el-dialog')[0]
    if (this.area instanceof Array && this.area.length >= 1) {
      dialogHeight = this.area[1]
      $dialog.style.height = dialogHeight
    }
    if (this.top) {
      $dialog.style.marginTop = this.top
      this.isCenter = false
    } else {
      this.isCenter = true
    }
  },
  computed: {
    // 是否国际化
    international() {
      return this.isExist(this.isInternational) ? this.isInternational : this.$NS.isInternational
    }
  },
  created() {
    this.initUtils()
  }
}
</script>
<style lang='scss' >
.ns-dialog--center {
  display: flex;
  justify-content: center;
  align-items: center;
  .el-dialog {
    margin: 0 !important;
  }
}
</style>
