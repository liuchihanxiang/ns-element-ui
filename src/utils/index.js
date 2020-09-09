//  处理国际化(必须放到method里面)
export const getInternationalValue = function (value) {
  if (this.international && this.$te(value)) {
    return this.$t(value)
  } else {
    return value
  }
}

// 判断是否存在 不存在去默认值
export const getDefaultVal = function (val, defaultVal) {
  return isExist(val) ? val : defaultVal
}

/**
 *判断是否为非空数组
 * @param {*} arr 要判断的对象
 * @returns
 */
export const notEmptyArray = function (arr) {
  return arr && arr instanceof Array && arr.length
}

/**
 *判断column中是否传了dicData 若传了非空数组则直接用这个渲染字典字段
 *若没传则取后面的
 * @param {*} dicData
 * @param {*} dicItem
 * @returns
 */
export const filterDic = function (dicData, dicItem) {
  return notEmptyArray(dicData) ? dicData : notEmptyArray(dicItem) ? dicItem : []
}
/**
 *判断是否为el-input组件
 * @export
 * @param {*} type
 * @returns
 */
export const isElInput = function (type) {
  const list = ['input', 'number', 'password', 'email', undefined]
  return list.includes(type)
}

/**
 *判断是否为data-picker组件
 * @export
 * @param {*} type
 * @returns
 */
export const isDatePicker = function (type) {
  let dateTypeList = ['year', 'month', 'date', 'dates', 'week', 'datetime', 'datetimerange', 'daterange', 'monthrange']
  return dateTypeList.indexOf(type) !== -1
}

/**
 *判断对象是否为空对象
 * @export
 * @param {*} obj
 * @returns
 */
export const isEmptyObject = function (obj) {
  if (typeof obj !== 'object') {
        console.warn('接受参数必须为对象') /*eslint-disable-line*/
    return
  }
  return Object.keys(obj).length === 0
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

const toString = Object.prototype.toString
export const isFunction = function (obj) {
  return toString.call(obj) === '[object Function]'
}

export const isExist = function (a) {
  return a !== null && a !== undefined
}
/**
 *判断两个对象结构和数据完全相等，而不要求同一引用
 *
 * @param {*} o1 o2 要比较的两个对象或其他
 * @returns
 */
export const deepEqual = function (o1, o2) {
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
 *验证是否问JSON格式的字符串
 * @export
 * @param {*} str
 * @returns
 */
export const isJsonString = function (str) {
  if (typeof str === 'string') {
    try {
      JSON.parse(str)
      return true
    } catch (e) {
      return false
    }
  }
}
