## drawer 抽屉

有些时候, Dialog 组件并不满足我们的需求, 比如你的表单很长, 亦或是你需要临时展示一些文档, Drawer 拥有和 Dialog 几乎相同的 API, 在 UI 上带来不一样的体验.


### 基本用法

:::demo 呼出一个临时的侧边栏, 可以从多个方向呼出
```html
  
<template>
  <div style="width:100%">
    <el-radio-group v-model="direction">
    <el-radio label="ltr">从左往右开</el-radio>
    <el-radio label="rtl">从右往左开</el-radio>
    <el-radio label="ttb">从上往下开</el-radio>
    <el-radio label="btt">从下往上开</el-radio>
  </el-radio-group>
  <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">点我打开</el-button>
  <ns-drawer   title="我是标题"
    :visible.sync="drawer"
    :direction="direction"  :before-close="handleClose"
  >
<div slot="other">123123</div>
1231231123123112312311231231
  </ns-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
        direction: 'rtl',
    }
  },
  methods: {
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
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
| noPadding | 是否需要padding | boolean | - | false |
| 其他属性参考element-ui属性  |


### Slot

| Name | Description |
|------|--------|
| title | 标题的内容 |
| other | 其他内容插入预留位置 |

### Events
其他属性参考element-ui属性
