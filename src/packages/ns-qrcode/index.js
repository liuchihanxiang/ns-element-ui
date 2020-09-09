import NsQrcode from './src'

/* istanbul ignore next */
NsQrcode.install = function (Vue) {
  Vue.component(NsQrcode.name, NsQrcode)
}

export default NsQrcode
