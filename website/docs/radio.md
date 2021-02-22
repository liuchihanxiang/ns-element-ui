## Radio 单选框 

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。。

### 单独使用
只需配置对应的字典数据`list`，默认字典字段分别位`label`、`value`，也可以通过`labelKey`、`valueKey`自定义;
`list`也可接收value数组例如`['男','女']`
:::demo 
```html
<template>
  <ns-radio v-model="selectVal"  @change="change"  placeholder="请选择" :dic-data="list" ></ns-radio>
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

### 按钮样式

配置`button`属性控制单选是否为按钮样式。
:::demo 
```html
<template>
  <ns-radio button v-model="selectVal"  @change="change"  placeholder="请选择" :dic-data="list" ></ns-radio>
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
| button | 是否为按钮样式 | boolean | — | false |
| size | 选择器尺寸 | string | medium/small/mini | — |
| text-color | 	按钮形式的 Radio 激活时的文本颜色 | string | — | #ffffff|
| fill | 按钮形式的 Radio 激活时的填充色和边框色	 | string | — | #409EFF |



### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 选中值发生变化时触发	 |目前的选中值
 |
