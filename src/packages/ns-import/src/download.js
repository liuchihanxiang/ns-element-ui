// import axios from 'axios'
// import { Message } from 'element-ui'
// import qs from 'qs'
// import { baseUrl } from '$config/env'

// 下载文件函数
function download(response, name, type) {
  name = name || 'excel'
  if (!response) {
    return
  }
  let filename = '文件'
  if (response.headers['content-disposition']) {
    filename = decodeURI(
      response.headers['content-disposition'].split(';filename=')[1]
    )
  }
  let blob = new Blob([response.data])
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob(blob, filename)
  } else {
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = filename
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
}

// 下载文件模板 ajax交互
export default function downloadFile (option) {
  let defaultOption = {
    url: '',
    method: 'post',
    data: {},
    params: {},
    name: '模板',
    beforeDownload: undefined
  }

  option = Object.assign({}, defaultOption, option)
  if (!option.url) {
    console.error('请填写下载地址')
  }
  if (option.original) {
    downloadImg(option.url, option.name)
    return
  }
  this.$http({
    url: option.url,
    method: option.method,
    params: option.params,
    data: option.data,
    responseType: 'blob',
    headers: {
      noBaseUrl: true
    }
  }).then(res => {
    // let data = res.data
    // if (data.type === 'application/json') {
    //   let reader = new FileReader()
    //   reader.addEventListener('loadend', function() {
    //     let result = reader.result ? JSON.parse(reader.result) : ''
    //     if (result && result.success !== true) {
    //       Message({
    //         type: 'error',
    //         message: result.msg || '请求出错'
    //       })
    //     }
    //   })
    //   reader.readAsText(data, ['utf-8'])
    //   return false
    // }
    if (option.beforeDownload && option.beforeDownload(res)) {
      download(res, option.name, option.type)
    } else {
      download(res, option.name, option.type)
    }
  })
}

export function downloadImg(url, name) {
  name = name || '图片'
  let link = document.createElement('a')
  link.href = url
  link.download = name
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  link.remove()
}
