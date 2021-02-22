## Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

### 单独使用
只需配置对应的字典数据`list`，默认字典字段分别位`label`、`value`，也可以通过`labelKey`、`valueKey`自定义;
`list`也可接收value数组例如`['男','女']`
:::demo 
```html
<template>
  <ns-select v-model="selectVal"  @change="change"  placeholder="请选择" :dic-data="list" ></ns-select>
</template>
<script>
  export default {
    data(){
      return {
        selectVal:1,
        list:[{
          label:'选项1',
          value:1
        },{
          label:'选项2',
          value:2
        },{
          label:'选项3',
          value:3
        },{
          label:'选项4',
          value:4
        }]
      }
    },
    methods:{
      change(val){
        console.log(`值改变了${val}`)
      }
    }
  }
</script>
```
:::




### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value / v-model     | 绑定值	           | string / number / boolean | — | — |
| dic-data     | 字典数据           | Array | — | [] |
| labelKey     |    字典数据中要显示的字段        | string | — | label |
| valueKey     | 作为 value 唯一标识的键名，绑定值为对象类型时必填  | string | — | value |
| multiple     | 是否多选           | boolean | — | false |
| collapseTags | 多选时是否将选中值按文字的形式展示 | boolean |  | false |
| size | 选择器尺寸 | string | medium/small/mini | — |
| closable | 是否可关闭 | boolean | — | true |
| placeholder | 占位符	 | string | — | — |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 选中值发生变化时触发	 |目前的选中值
 |
