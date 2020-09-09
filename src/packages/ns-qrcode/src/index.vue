<template>
  <div id="qrcode" :style="getStyle" ref="qrcode" />
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'NsQrcode',
  components: {
    QRCode: QRCode
  },
  data() {
    return {
      msg: 'hello vue',
      codes: ''
    }
  },
  props: {
    url: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#1EABFC'
    },
    size: {
      type: Number,
      default: 160 // 232
    }
  },
  methods: {
    qrcode() {
      new QRCode('qrcode', {
        /* eslint-disable-line */
        width: this.size, // 设置宽度
        height: this.size, // 设置高度
        correctLevel: QRCode.CorrectLevel.H,
        render: 'canvas',
        colorDark: this.color,
        text: this.url
      })
    }
  },
  computed: {
    getStyle() {
      return {
        height: this.size + 20 + 'px',
        width: this.size + 20 + 'px',
        background: `linear-gradient(${this.color}, ${this.color}) left top,
    linear-gradient(${this.color}, ${this.color}) left top,
    linear-gradient(${this.color}, ${this.color}) right top,
    linear-gradient(${this.color}, ${this.color}) right top,
    linear-gradient(${this.color}, ${this.color}) right bottom,
    linear-gradient(${this.color}, ${this.color}) right bottom,
    linear-gradient(${this.color}, ${this.color}) left bottom,
    linear-gradient(${this.color}, ${this.color}) left bottom`,
        'background-repeat': 'no-repeat',
        'background-size': '3px 40px, 40px 3px'
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.qrcode()
    })
  }
}
</script>
