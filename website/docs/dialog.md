## Alert 警告

用于页面中展示重要的提示信息。

### 基本用法

页面中的非浮层元素，不会自动消失。

:::demo Alert 组件提供四种主题，由`type`属性指定，默认值为`info`。
```html
  
<template>
  <div>
    <el-button type="text" @click="show=true">点击打开（可设置显示最大化最小化）</el-button>
    <br />
    <el-button type="text" @click="show2=true">点击打开自定义表头</el-button>
    <ns-dialog :visible.sync="show" showFullScreen title="我是标题" :area="['600px','auto']">
      <span>我是内容</span>
    </ns-dialog>
    <ns-dialog :visible.sync="show2" showFullScreen :area="['600px','auto']">
      <template slot="title">
        <h3 style="color:red">我是标题</h3>
      </template>
      <span>我是内容</span>
    </ns-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      show2: false
    }
  }
}
</script>
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
