## table 表格

用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

### 基本用法

基础的表格展示用法。

:::demo table表格由五大块[NsForm搜索区、btnList操作区、Column内容展示区、Operations行内操作栏、底部分页栏]组成。该五大块除了Column内容展示区，其他都可根据属性配置移除。
```html
  
<template>
  <div style="width:100%">
    <ns-grid
      :formList="formList"
      :btnList="btnList"
      :permit="filterBtn"
      row-key="id"
      :operations="operations"
      :tableData="tableData1"
      @handlerSearch="handlerSearch"
      :formOption="{
        searchBtn:{
          onlyShowIcon:true
        }
      }"
      :columns="columns"
    ></ns-grid>
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
    handlerSearch(){
      alert('查询后')
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


### Table Attributes
其他属性参考element-ui,此处只列举一些常用属性、字段

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| url | table数据来源请求接口 | String | - | - |
| httpMethod | table数据请求方式（只适用于请求数据，不适用tableData传值） | Boolean | - | false |
| tableData | table使用的数据集合 | Array | - | [] |
| columns | 参考element-ui,必填项 | Array | - | [] |
| stripe | 是否为斑马纹 table	 | boolean | - | false |
| border | 是否带有纵向边框 | boolean | - | false |
| btnListAlone | 头部盒子内容是否独占一行 | Boolean | - | false |
| reserve-selection	 | 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）	 | Boolean | - | false |
| lastSearchModel | 最后一次查询的参数 | Object | - | - |
| pagination | 控制分页组件是否展示 | Boolean | - | true |
| pageList | 	（page-sizes）每页显示个数选择器的选项设置	 | number[]	| - | [10, 20, 50, 100] |
| paginationLayout | （layout）组件布局，子组件名用逗号分隔 | String  | sizes, prev, pager, next, jumper, ->, total, slot	 | ['prev, pager, next, jumper, ->, total'] |
| formOption | 查询表单基础规则配置项,参考ns-form。 | Object | - | {} |
| formList | 查询表单内容配置项,使用方法与ns-form类似，不能使用form的必填校验方式。 | Object | - | {} |
| btnList | btnList操作区内容配置项 | Array | - | [] |
| sidePagination | 判断是前端分页还是后端分页 | String | client（前端）/server（后端） |  server  |
| search | 判断当前数据来源是(前端还是后端)，然后调用不同的查询数据方法 | String | client（前端）/server（后端） |  server  |
| dataFieldConfig | data默认返回的数据结构层级 | Object | - | - |
| operations | Operations行内操作栏内容配置项 | Array | - | - |
| operationsConfig | Operations行内操作栏设置 | Object | - | - |


### Table-columns Attributes
其他属性参考element-ui,此处只列举一些常用属性、字段

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 对应列的类型。如果设置了 selection 则显示多选框；如果设置了 index 则显示该行的索引（从 1 开始计算）；如果设置了 expand 则显示为一个可展开的按钮	 | string | selection/index/expand	 | — |
| prop | 对应列内容的字段名，也可以使用 property 属性	 | string | - | - |
| label | 对应列展示的内容 | string | - | - |
| width | 对应列的宽度 | string | - | - |
| formatter | 用来格式化内容 | Function(row, column, cellValue, index) | - | - |
| align | 对齐方式 | left/center/right | - | - |
| headerAlign | 表头对齐方式，若不设置该项，则使用表格的对齐方式 | left/center/right | - | - |
| reserveSelection | 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）	 | Boolean  | - | false |
| show | 控制列是否展示 | undefined/boolean | - | undefined |
| fixed | 列是否固定在左侧或者右侧，true 表示固定在左侧	 | string, boolean | true/left/right	 | - |
| slotName | 对应列的slot | string, boolean | true/left/right	 | - |


### Table-btnList Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| text | 按钮名称 | string | - | - |
| type | 类型 | string | primary/success/warning/danger/info/text | primary |
| group | group且children存在时，使用下拉菜单形式的按钮 | - | - | - |
| plain | 是否朴素按钮 | boolean | - | false |
| click | 点击事件 | Function(type, row) |  | - |
| show | 按钮的显示与隐藏，string直接判断即可。如果类型是[object Function]的话，取返回值即可 | string/[object Function] |  string/function(row) | - |


### Table-operations Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| text | 按钮名称 | string | - | - |
| btnType | 类型 | string | primary/success/warning/danger/info/text | text |
| size | 尺寸 | string | medium/small/mini  | mini |
| click | 点击事件 | Function(type, row) |  | - |
| judges | 按钮的显示与隐藏，string直接判断即可。如果类型是[object Function]的话，取返回值即可 | string/[object Function] |  string/function(row) | - |



### Table Slot

| Name | Description |
|------|--------|
| — | 描述 |
| headerExtraWrap | 头部查询表单，额外的插槽盒子的slot |
| extraBtn | 按钮盒子的slot |
| searchBtn | 查询按钮的slot |
| btnList | btnList操作区盒子的slot |
| selectionContent | 勾选展示数据区域的slot |

### Table Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| fetch | 自定义请求数据方法 |  function(params) |  
| permit | 判断按钮权限的方法，根据返回的值判断按钮是否显示 | - | 
| queryParams | table数据请求之前，参数拼装 | - | 
| loadSuccess | table数据请求完成之后执行事件，返回的值为组装后的参数。 | queryParams(obj, copyFormParams) | 
| handlerRefresh | 刷新table数据 | - | 
| handlersearchFormReset | 重置table头部的查询form表单 | - | 
| responseHandler | 对返回的table数据操作，return返回的值为当前table所需数据 | - | 
| toggleFullScreen | table区域（进入/退出）全屏 | - | 


