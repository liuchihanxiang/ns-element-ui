/**
 *判断是否为非空数组
 * @param {*} arr 要判断的对象
 * @returns
 */
export function notEmptyArray (arr) {
  return arr && arr instanceof Array && arr.length
}
export function isExist (a) {
  return a !== null && a !== undefined
}
/**
 *判断column中是否传了dicData 若传了非空数组则直接用这个渲染字典字段
 *若没传则取后面的
 * @param {*} dicData
 * @param {*} dicItem
 * @returns
 */
export function filterDic (dicData, dicItem) {
  return notEmptyArray(dicData) ? dicData : dicItem
}
/**
 *判断是否为el-input组件
 * @export
 * @param {*} type
 * @returns
 */
export function isElInput (type) {
  if (type === undefined || type === 'input' || type === 'textarea' || type === 'password') {
    return true
  } else {
    return false
  }
}

/**
 *判断是否为data-picker组件
 * @export
 * @param {*} type
 * @returns
 */
export function isDatePicker (type) {
  let dateTypeList = ['year', 'month', 'date', 'dates', 'week', 'datetime', 'datetimerange', 'daterange']
  return dateTypeList.indexOf(type) !== -1
}

/**
 *判断对象是否为空对象
 * @export
 * @param {*} obj
 * @returns
 */
export function isEmptyObject (obj) {
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
export function getValueByPath (object, prop) {
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
