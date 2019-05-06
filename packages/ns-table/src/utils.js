const toString = Object.prototype.toString
export function isFunction (obj) {
  return toString.call(obj) === '[object Function]'
}
export function isExist (a) {
  return a !== null && a !== undefined
}
/**
 *判断两个对象结构和数据完全相等，而不要求同一引用
 *
 * @param {*} o1 o2 要比较的两个对象或其他
 * @returns
 */
export function deepEqual (o1, o2) {
  if (typeof o1 !== 'object' || typeof o2 !== 'object') { return o1 === o2 }
  // 完全遍历 o1,保证 o2 的数据结构可以覆盖 o1的，也就是说 o2的数据结构大于等于 o1的
  for (var p in o1) {
    if (!deepEqual(o1[p], o2[p])) { return false }
  }
  // 保证 o2中存在的数据结构在 o1中也存在，结合上一步，即可证明二者数据结构完全一致
  for (var q in o2) {
    if (!(q in o1)) { return false }
  }
  return true
}
// 判断数组对象是否
export const isInArr = function (arr, item) {
  let flag = -1
  for (let i = 0; i < arr.length; i++) {
    if (deepEqual(arr[i], item)) {
      flag = i
      break
    } else {
      flag = -1
    }
  }
  return flag
}

/**
 *判断对象是否为空对象
 * @export
 * @param {*} obj
 * @returns
 */
export function isEmptyObject (obj) {
  if (obj && typeof obj !== 'object') {
        console.warn('接受参数必须为对象') /*eslint-disable-line*/
    return
  }
  return Object.keys(obj).length === 0
}
/**
 *验证是否问JSON格式的字符串
 * @export
 * @param {*} str
 * @returns
 */
export function isJsonString (str) {
  if (typeof str === 'string') {
    try {
      JSON.parse(str)
      return true
    } catch (e) {
      return false
    }
  }
}
/**
 * 根据字符串找到对象中对应的值
 * 例如在obj中查找 obj.data.list.page对应的值
 * getValueByPath(obj,'data.list.page')
 * @param {*} object   要查找的对象
 * @param {*} prop 字符串 索引路径
 */
export const getValueByPath = function (object, prop) {
  prop = prop || ''
  const paths = prop.split('.')
  let current = object
  let result = null
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i]
    if (!current) break

    if (i === j - 1) {
      result = current[path]
      break
    }
    current = current[path]
  }
  return result
}
