## NumberRange 数据范围

当选项过多时，使用下拉菜单展示并选择内容。

### 使用方法
数据范围输入框，当开始数据大于结束数据时失焦后强制自动反转
:::demo
```html
<template>
  <ns-number-range v-model="selectVal"  ></ns-number-range>
</template>
<script>
  export default {
    data(){
      return {
        selectVal:[5,10],
      
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
