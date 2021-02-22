## edtor 富文本编辑器 


### 使用方法

:::demo 
```html
<template>
  <ns-editor v-model="selectVal" @change="change"    placeholder="请选择"  ></ns-editor>
</template>
<script>
  export default {
    data(){
      return {
        selectVal:'默认内容',
       
      }
    },
    methods:{
      change(val){
        console.log(val)
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
| placeholder     | 占位符           | string | — | - |
| disabled     |    禁用编辑器       | boolean | — | false |
| labelList     | 占位标签list  | Array | — | [] |
| init     | 编辑器初始化配置  | Object | — | - |



### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 选中值发生变化时触发	 |目前的选中值|
