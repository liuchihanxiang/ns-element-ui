## container 容器盒子

### 基本用法

:::demo 
```html
  
<template>
  <div style="width:100%">
  <!-- 类型 -->
    <div>
      <el-button @click="code = i"  v-for="(item,i) in list" :key="i" :type="code === i ? 'primary':''" >组件{{item.label}}</el-button>
    </div>

    <!-- 有无title切换 -->
    <div style="margin-top:20px;">
      <el-radio-group v-if="list[code].children && list[code].children.length" v-model="avtive">
        <el-radio  v-for="(item,i) in list[code].children" :label="i" :key="i">{{item.name}}</el-radio>
      </el-radio-group>
    </div>

    <!-- 有无type切换 -->
    <div style="margin-top:20px;">
      <el-radio-group v-if="list[code].state && list[code].state.length" v-model="state">
        <el-radio  v-for="(item,i) in list[code].state" :label="item" :key="item">{{item}}</el-radio>
      </el-radio-group>
    </div>
    
    <ns-container style="margin-top:20px;" :code="code" :state="state" :type="avtive"  :title="list[code].children[avtive] ? list[code].children[avtive].title :''">
      <ul style="padding:0;margin:0;">
        <li v-for="item in 10" :key="item" class="error">一二三四五六七八九十</li>
      </ul>
    </ns-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: 0,
      avtive:0,
      state:'a',
      list:[
        {label:0,
          children:[
            {name:'无title'},
            {name:'有title,与线平行',title:'title标题'},
            {name:'有title,title在头部',title:'title标题'},
            {name:'多个title',title:['title1','title2','title3']}
          ],
          state:['a','p','m']},
        {label:1,children:[]},
        {label:2,children:[{name:'无title'},{name:'有title',title:'title标题'}]},
        {label:3,children:[{name:'无title'},{name:'有title',title:'title标题'}]},
        {label:4,children:[{name:'无title'},{name:'有title',title:'title标题'}]},
        {label:5,children:[{name:'有title',title:'title标题'}]},
      ]
    }
  },
  methods: {},
  watch: {
    code: {
      immediate: true,
      handler: function (val) {
        this.avtive = 0
        this.state = 'a'
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
.error{
  color:red;
}

</style>
```
:::


### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| code | 组件下标序号 | Number | 0-5 | 0 |fd8b38
| title | 盒子头部的标题 | 默认String，code为0时，可以为Array | - | - |
| state | 组件颜色状态（仅在code为0是有效，用于展示不同title样式） | String | a(#fd8b38)/p(#97d2fe)/m(#92ecdc) | p |
| type | 组件内默认样式序号（仅在code为0是有效，用于展示不同title样式） | Number | 0-3 | 0 |

### Slot
| Name | Description |
|------|--------|
| — | 内容插槽 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| handleTitleClick | title为数组时（code等于0时生效），点击操作之后，所需要执行的事件 |  function(index) |  
