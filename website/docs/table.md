## Alert 警告

用于页面中展示重要的提示信息。

### 基本用法

页面中的非浮层元素，不会自动消失。

:::demo Alert 组件提供四种主题，由`type`属性指定，默认值为`info`。
```html
  
<template>
  <div style="width:100%">
    <ns-table
      :formList="formList"
      :btnList="btnList"
      :permit="filterBtn"
      row-key="id"
      btnListAlone
      :pagination="false"
      :operations="operations"
      :tableData="tableData1"
      :columns="columns"
    ></ns-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      permissionBtn: { add: '创建', del: '导入' },
      formList: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'name1',
          label: '哈哈'
        },
        {
          prop: 'name5',
          label: '下达'
        }
      ],
      btnList: [
        {
          click: this.btn1Click,
          code: 'add'
        },
        {
          click: this.btn1Click,
          code: 'del',
          position:'right'
        }
      ],
      columns: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'date',
          label: '日期'
        },
        {
          prop: 'address',
          label: '地址'
        }
      ],
       tableData: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableData1: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎333',
          address: '上海市普陀区金沙江路 1519 弄',
          hasChildren1: true
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
      operations: [
        {
          icon: 'el-icon-delete',
          text: '新增',
          code: 'add'
        },
        {
          icon: 'el-icon-delete',
          text: '删除',
          code: 'del'
        }
      ]
    }
  },
  methods: {
    btn1Click() {
      this.$message({
        message: '点击啦'
      })
    },
    filterBtn(code) {
      return this.permissionBtn[code]
    }
  }
}
</script>
<style lang="scss">
table {
  margin: 0;
}
</style>
```
:::


### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title     | 标题           | string | — | — |
| type | 主题 | string | success/warning/info/error | info |
| description | 辅助性文字。也可通过默认 slot 传入 | string | — | — |
| closable | 是否可关闭 | boolean | — | true |
| center | 文字是否居中 | boolean | — | true |
| close-text | 关闭按钮自定义文本 | string | — | — |
| show-icon | 是否显示图标 | boolean | — | false |
| effect | 选择提供的主题 | string | light/dark | light |

### Slot

| Name | Description |
|------|--------|
| — | 描述 |
| title | 标题的内容 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| close | 关闭alert时触发的事件 | — |
