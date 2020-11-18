<template>
  <el-drawer :visible.sync="show"
    :class="{'ns-drawer':true,'no-padding':noPadding}"
    @close="close"
    v-bind="$attrs">
    <slot name="other"></slot>
    <el-scrollbar :native="false"
      style="height:100%"
      :noresize="false">
      <div class="el-drawer__content">
        <slot></slot>
      </div>
    </el-scrollbar>
    <div class="el-drawer__footer"
      v-if="footer">
      <slot name="footer">
        <el-button type="primary"
          v-if="confirmBtn"
          @click="ok">{{confirmText}}</el-button>
        <el-button class="btn-cancel"
          v-if="cancelBtn"
          type="default"
          @click="$emit('update:visible', false)">{{cancelText}}</el-button>
      </slot>

    </div>
  </el-drawer>
</template>

<script>
import throttle from 'lodash/throttle'

export default {
  inheritAttrs: true,
  name: 'NsDrawer',
  data() {
    return {
      show: false
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    footer: {
      type: Boolean,
      default: true
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    confirmBtn: {
      type: Boolean,
      default: true
    },
    cancelBtn: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    noPadding: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler: function (val) {
        this.show = val
        console.log(val)
      }
    }
  },
  methods: {
    handleClose() {},
    close() {
      this.$emit('update:visible', false)
      this.$emit('close')
    },
    ok: throttle(function () {
      this.$emit('ok')
    }, 1000)
  }
}
</script>
