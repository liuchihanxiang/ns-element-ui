## Form 表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据。

### 输入框类

:::demo

```html
<template> 
  <ns-form ref="nsForm" v-model="formModel" :label-width="120" :form-list="formList" >
    <template slot="submit">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button type="primary" plain @click="setData">赋值</el-button>
    </template>
  </ns-form>
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
        },{
          type:'upload',
          label:'头像',
          prop:'uploadImg',
          size:100,
          tipList:[
            '构图提示：重要图文内容请在横幅顶部下方210px 高度、宽度1200px 内设计，效果更佳。',
            '图片大小： 不超过300Kb；图片尺寸： 1920px * 320px (宽*高）；支持格式：jpeg,jpg, png。'
            ]
        },{
          type:'outItemSlot',
          slotName:'submit',
          label:'头像',
          prop:'submit',
         },
        ]
      }
    },
    methods:{
      change(val){
        console.log(`值改变了${val}`)
      },
      submit(){
        let data = this.$refs.nsForm.formDataParam()
        console.log(data)
      },
      setData(){
          this.formModel = {
            name:1,
            name2:2,
            name3:3,
            name4:4,
            ageRange:[5,6],
            uploadImg:'/assets/images/plant-1.png'
          }
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


### 时间相关类

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
          type:'datetime',
          label:'日期选择',
          prop:'datetime',
          default:'请选择'
        },{
          type:'datetimerange',
          label:'日期范围',
          prop:'datetimerange',
          default:'请选择'
        },{
          type:'monthrange',
          label:'月份范围',
          prop:'monthrange',
          default:'请选择'
        },{
          type:'timePicker',
          label:'时间选择',
          prop:'timePicker',
          default:'请选择'
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
| type     | 表单类型           | String | input,number,email,password,textarea,inputNumber,autocomplete,select,checkbox,radio,switch,timePicker,year, month, date, dates, week, datetime, datetimerange, daterange,upload | input |
| label | 标签文本 | string | - | - |
| placeholder | 输入框占位文本 | string | - | - |
| default | 初始默认值 | * | - | - |
| show | 控制表单项是否显示 | boolean | - | true |
| isSearch | 当mixins为true即混合表单时，配置该属性后表单项会只渲染到表格上方的查询表单内 | boolean | - | — |
| isNormal | 当mixins为true即混合表单时，配置该属性后表单项会只渲染到非查询表单内，查询表单不会渲染 | boolean | - | — |
| slotName | 插槽名称,当type为slot、outItemSlot、groupLineSlot时 对应的插槽的名称 | string | - | - |
| labelSlot | 标签文本是否使用插槽 如果使用插槽 默认插槽名称为表单项prop字段和Label的拼接，例如prop为name 则插槽名称为:nameLabel | string | - | - |
| dicData | 当type为select、radio、checkbox时对应渲染的数据集合 | Array | - | [] |
| size | 用于控制该表单内组件的尺寸（如果type=‘upload’的话，size表示图片大小。单位是K）	 | string（type="upload"时，类型为number） | medium / small / mini | — |
| tipList | type="upload"图片上传时，规则的描述 | array | - | - |


### Slot

| Name | Description |
|------|--------|
| — | 描述 |
| title | 标题的内容 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| close | 关闭alert时触发的事件 | — |
| beforeFormData | formData参数组装之前，调用参数，返回值为data | data |
| formDataParam | formData表单的值，返回值为formData参数 | form |


