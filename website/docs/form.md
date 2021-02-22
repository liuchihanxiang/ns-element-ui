## Form 表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据。

### 输入框类

:::demo

```html
<template> 
  <ns-form v-model="formModel" :label-width="120" :form-list="formList" ></ns-form>
</template>
<script>
  export default {
    data(){
      return {
        formModel:{},
        formList:[{
          label:'输入框',
          prop:'name',
          default:'我是输入框'
        },{
          label:'隐藏的解释语',
          prop:'name2',
          tips:'我是解释语',
          placeholder:'请输入'
        },{
          label:'上方解释语',
          prop:'name3',
          prefix:'我是解释语',
          placeholder:'请输入'
        },{
          type:'numberRange',
          label:'年龄段',
          prop:'ageRange'
        },{
          type:'textarea',
          label:'文本域',
          prop:'name4',
          autosize:{ minRows: 4, maxRows: 8},
          placeholder:'请输入'
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

### 选择类

:::demo

```html
<template> 
  <ns-form v-model="formModel" :label-width="70" :form-list="formList" ></ns-form>
</template>
<script>
  export default {
    data(){
      return {
        formModel:{},
        formList:[{
          type:'select',
          label:'下拉单选',
          prop:'name',
          default:'1',
          dicData:[{
            label:'香蕉',
            value:'1'
          },{
            label:'苹果',
            value:'2'
          },{
            label:'菠萝',
            value:'3'
          }]
        },{
          type:'select',
          label:'下拉多选',
          multiple:true,
          prop:'name2',
          default:['1'],
          dicData:[{
            label:'香蕉',
            value:'1'
          },{
            label:'苹果',
            value:'2'
          },{
            label:'菠萝',
            value:'3'
          }]
        },{
          type:'radio',
          label:'单选',
          prop:'name3',
          default:'1',
          dicData:[{
            label:'香蕉',
            value:'1'
          },{
            label:'苹果',
            value:'2'
          },{
            label:'菠萝',
            value:'3'
          }]
        },{
          type:'checkbox',
          label:'多选',
          prop:'name4',
          default:['1'],
          dicData:[{
            label:'香蕉',
            value:'1'
          },{
            label:'苹果',
            value:'2'
          },{
            label:'菠萝',
            value:'3'
          }]
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

### 富文本

:::demo

```html
<template> 
  <ns-form v-model="formModel" :label-width="70" :form-list="formList" ></ns-form>
</template>
<script>
  export default {
    data(){
      return {
        formModel:{},
        formList:[{
          type:'editor',
          label:'富文本',
          prop:'name'
        },
        {
          type:'editor',
          label:'标签文本',
          prop:'name1',
          labelList:['姓名','活动名称','开始时间','结束时间','账号','测评地址']
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


### Form Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value / v-model     | 必填，表单绑定的对象           | Object | — | — |
| formList | 必填，表单内具体配置项的集合 | Array | - | [] |
| mixins | 是否为混合型(只在表格组件中生效)，混合型指的是表单配置项formList内含有查询表单和创建表单,当设置为true时，配置isNormal:true的表单项会只渲染到创建等普通表单中，若配置isSearch:true的表单项会只渲染到表格上方的查询表单内，若两项都不配置则两种表单都会渲染 | boolean | — | false |
| label-width | 表单域标签的宽度，例如 '50'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。 | string | — | — |
| status-icon	 | 是否在输入框中显示校验结果反馈图标 | boolean | — | false |
| size | 用于控制该表单内组件的尺寸	 | string | medium / small / mini | — |

### FormList Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type     | 表单类型           | String | input,number,email,password,textarea,inputNumber,autocomplete,select,checkbox,radio,switch,timePicker,year, month, date, dates, week, datetime, datetimerange, daterange | input |
| label | 标签文本 | string | - | - |
| placeholder | 输入框占位文本 | string | - | - |
| default | 初始默认值 | * | - | - |
| show | 控制表单项是否显示 | boolean | - | true |
| isSearch | 当mixins为true即混合表单时，配置该属性后表单项会只渲染到表格上方的查询表单内 | boolean | - | — |
| isNormal | 当mixins为true即混合表单时，配置该属性后表单项会只渲染到非查询表单内，查询表单不会渲染 | boolean | - | — |
| slotName | 插槽名称,当type为slot、outItemSlot、groupLineSlot时 对应的插槽的名称 | string | - | - |
| labelSlot | 标签文本是否使用插槽 如果使用插槽 默认插槽名称为表单项prop字段和Label的拼接，例如prop为name 则插槽名称为:nameLabel | string | - | - |
| dicData | 当type为select、radio、checkbox时对应渲染的数据集合 | Array | - | [] |
| size | 用于控制该表单内组件的尺寸	 | string | medium / small / mini | — |
### Slot

| Name | Description |
|------|--------|
| — | 描述 |
| title | 标题的内容 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| close | 关闭alert时触发的事件 | — |
