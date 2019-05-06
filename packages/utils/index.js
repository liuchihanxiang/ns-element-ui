//  处理国际化(必须放到method里面)
export const getInternationalValue = function (value) {
  if (typeof value !== 'string') {
        console.error('参数必须为字符串') /*eslint-disable-line*/
    return false
  }

  if (this.international && this.$te(value)) {
    return this.$t(value)
  } else {
    return value
  }
}
export function isExist (a) {
  return a !== null && a !== undefined
}
