## box 盒子

### 基本用法

:::demo 
```html
  
<template>
  <!-- <div style="width:100%">
    <el-radio-group v-model="code">
      <el-radio v-for="(item,i) in list" :label="item" :key="item">选项{{i}}</el-radio>
    </el-radio-group>
    <ns-box :code="code" />
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      code: 0,
      list:[0,1,2,3,4,5]
    }
  },
  methods: {}
}
</script>
```
:::


### Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| noPadding | 是否需要padding | boolean | - | false |
| 其他属性参考element-ui属性  |


### Slot

| Name | Description |
|------|--------|
| title | 标题的内容 |
| other | 其他内容插入预留位置 |

### Events
其他属性参考element-ui属性
