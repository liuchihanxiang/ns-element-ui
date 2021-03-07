## import 导入

用于导入文件、导出文件模板等。

### 基本用法

导入组件是基于 'ns-dialog' 弹窗组件内进行封装使用的，页面中的非浮层元素，不会自动消失。

:::demo Alert 组件提供四种主题，由`type`属性指定，默认值为`info`。
```html
  
<template>
  <div style="width:100%">
  <el-button @click="uploadVisible = !uploadVisible"  type="primary">导入文件</el-button>
  <el-button @click="uploadVisible1 = !uploadVisible1"  type="primary">导入文件(多种文件)</el-button>
   <ns-import :visible.sync="uploadVisible"
      :upload-list="uploadList"
      title="导入文件" />
   <ns-import :visible.sync="uploadVisible1"
      :upload-list="uploadList1"
      title="导入文件(多种文件)" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadVisible: false,
      uploadVisible1: false,
      uploadList: [
        {
          name: 'file',
          accept: '.xls,.xlsx',
          uploadUrl: '/fieldSource/importExcel',
          downLoadUrl: '/information/exportExcel',
          tplName: '文件1',
          multiple: true,
          size: 16,
          tips: '只能上传excel格式文件',
          downloadTitle: '文件1模板'
        }
      ],
       uploadList1: [
        {
          name: 'file',
          accept: '.xls,.xlsx',
          uploadUrl: '/fieldSource/importExcel',
          downLoadUrl: '/information/exportExcel',
          tplName: '文件1',
          multiple: true,
          size: 16,
          downloadTitle: '文件1模板'
        },
        {
          name: 'file',
          accept: '.xls,.xlsx',
          uploadUrl: '/fieldOption/importSourceOptionExcel',
          downLoadUrl: '/information/exportExcel',
          tplName: '文件2',
          multiple: false,
          downloadTitle: '文件2模板'
        },
        {
          name: 'file',
          accept: '.xls,.xlsx',
          uploadUrl: '/fieldOption/importSourceOptionExcel',
          downLoadUrl: '/information/exportExcel',
          tplName: '文件3',
          multiple: false,
          downloadTitle: '文件3模板'
        },
        {
          name: 'file',
          accept: '.xls,.xlsx',
          uploadUrl: '/fieldOption/importSourceOptionExcel',
          downLoadUrl: '/information/exportExcel',
          tplName: '文件4',
          multiple: false,
          downloadTitle: '文件4模板'
        }
      ]
    }
  },
  methods: {
  }
}
</script>
<style lang="scss"></style>
```
:::


### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title     | 标题           | string | — | 上传 |
| visible | 弹窗是否打开 | boolean | - | false |
| closable | 是否可关闭 | boolean | — | false |
| destroyOnClose | 关闭时销毁 Dialog 中的元素	| boolean | - | true |
| showFullScreen | 全屏（进入/退出） icon按钮是否展示	| boolean | - | false |
| footer | 弹窗默认底部按钮组是否展示	| boolean | - | true |
| show-icon | 是否显示关闭icon图标 | boolean | — | true |
| closeOnPressEscape | 是否可以通过按下 ESC 关闭 Dialog	 | boolean | - | true |
| closeOnClickModal | 是否可以通过点击 modal 关闭 Dialog | boolean | - | false |
| customClass | Dialog 的自定义类名	| string | - | - |
| appendToBody | Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true		| boolean | - | false |
| area | 弹窗宽高数组 | Array/String | - | ['800px', 'auto'] |
| beforeClose | 关闭前的回调，会暂停 Dialog 的关闭	 | function(done)，done 用于关闭 Dialog	 | - | - |
| width | Dialog的宽度,但是项目内，是取area[0]的数据	| string	 | - | 800px |
| height | Dialog的高度,但是项目内，是取area[1]的数据	| string	 | - | auto |
| top | Dialog CSS 中的 margin-top 值		| string	 | - | - |
| cancelBtn | Dialog 底部footer内 ‘关闭’ 按钮是否显示		| Boolean | - | true |
| cancelText | Dialog 底部footer内 ‘关闭’ 按钮文案		| String | - | 取消 |
| confirmBtn | Dialog 底部footer内 ‘确认’ 按钮是否显示		| Boolean | - | true |
| confirmText | Dialog 底部footer内 ‘确认’ 按钮文案		| String | - | 上传 |
| isDestroy | 是否清空弹窗盒子内容 | Boolean | - | true |
| yesBtn | ‘上传’按钮是否展示 | Boolean | - | true |
| tplSwitchMax | 右侧‘导入选择’区域最大展示数量，超过制定数量时，变成select下拉切换功能 | Number | - | 3 |
| uploadSurplusNum | 剩余可上传次数 | Number | - | 10 |
| uploadMaxErrorMsg | 上传数量超出时的提示文案 | String | - | 附件数量已达最大值！ |
| uploadList | 上传的内容参数数组 | Array | - | - |

###  后台接收字段介绍

| 参数  | 说明  | 类型 | 可选值  | 默认值  |
| --- | --- | --- | --- | --- |
| name  | 接收文件字段名称  | String  | - | file  | 
| accept  | 文件格式  | String | - | .xls,.xlsx | 
| uploadUrl | 保存文件的接口地址  | String  | - | - |
| downLoadUrl | 文件模板下载的接口地址  | String  | - | - |
| multiple | 是否支持多选文件 | boolean  | - | true |
| tips | 上传的文件介绍说明 | String  | - | - |
| tipsType | 文件说明的状态样式	 |  String  | success/warning/info/error	 | success |
| limit | 最大允许上传个数  |  number  | - | 10 |
| size | 文件大小，默认单位k  |  number  | - | 500 |
| autoUpload | 是否在选取文件后立即进行上传 |  boolean  | - | false |
| uploadExtraData | 上传所需要的额外参数 |  object/Function  | - | false |


### Slot

| Name | Description |
|------|--------|
| tip | 文件上传失败提示位置  |
| footer | ns-dialog 的底部位置 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| closed | 清空组件数据 | — |
| beforeAvatarUpload | 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。默认在此判断文件格式、文件大小是否符合要求	 | function(file) |
| beforeUpload | beforeAvatarUpload事件处理完后，所需要执行的而外事件	 | function(file) |
| afterSuccess | onSuccess上传成功，需要处理的额外方法 | function(data, fileList) |
