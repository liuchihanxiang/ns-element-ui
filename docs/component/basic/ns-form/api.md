# 表单组件api
---
<template>
  <Common-DemoApi type="attr" title="ns-form属性" :apiData="nsFormApiData"></Common-DemoApi>
  <Common-DemoApi type="attr" title="formList属性" :apiData="formListApiData"></Common-DemoApi>
</template>

<script>
  export default {
    data(){
      return {
        nsFormApiData:[
          {
          params:'value / v-model',
          describe:'必填，表单绑定的对象',
          type:'Object',
          optionValue:'—',
          defaultValue:'—'
        },
        {
          params:'formList',
          describe:'必填，表单内具体配置项的集合',
          type:'Object',
          optionValue:'—',
          defaultValue:'—'
        },
        {
          params:'mixins',
          describe:`是否为混合型，混合型指的是表单配置项formList内含有查询表单和创建表单,当设置为true时，配置isNormal:true的表单项会只渲染到创建等普通表单中，若配置isSearch:true的表单项会只渲染到表格上方的查询表单内，若两项都不配置则两种表单都会渲染`,
          type:'boolean',
          optionValue:'true/false',
          defaultValue:'false'
        },
        {
          params:'submitBtn/searchBtn/resetBtn',
          describe:'表单按钮searchBtn和resetBtn配置项只在查询表单中才会显示，submitBtn则是正常表格中的提交按钮配置项',
          type:'Object',
          optionValue:'show是否显示提交按钮,text提交按钮的文字，size:medium按钮尺寸',
          defaultValue:'—'
        },{
          params:'isInternational',
          describe:'是否国际化',
          type:'boolean',
          optionValue:'true/false',
          defaultValue:'false'
        }
        ],
        formListApiData:[
          {
          params:'type',
          describe:'表单类型',
          type:'string',
          optionValue:`input,number,email,password/textarea/inputNumber/autocomplete/select/checkbox/radio/switch/timePicker/'year', 'month', 'date', 'dates', 'week', 'datetime', 'datetimerange', 'daterange'`,
          defaultValue:'—'
          },
          {
          params:'label',
          describe:'标签文本',
          type:'string',
          optionValue:`—`,
          defaultValue:'—'
          },
          {
          params:'prop',
          describe:'表单域字段',
          type:'string',
          optionValue:`v-model中绑定的对象中的字段`,
          defaultValue:'—'
          },{
          params:'placeholder',
          describe:'输入框占位文本',
          type:'string',
          optionValue:'—',
          defaultValue:'—'
        },{
          params:'default',
          describe:'初始默认值',
          type:'*',
          optionValue:'null',
          defaultValue:'null'
        },{
          params:'show',
          describe:'控制表单项是否显示',
          type:'boolean',
          optionValue:'true/false',
          defaultValue:'false'
        },{
          params:'isSearch',
          describe:'当mixins为true即混合表单时，配置该属性后表单项会只渲染到表格上方的查询表单内',
          type:'boolean',
          optionValue:'true/false',
          defaultValue:'—'
        },{
          params:'isNormal',
          describe:'当mixins为true即混合表单时，配置该属性后表单项会只渲染到非查询表单内，查询表单不会渲染',
          type:'boolean',
          optionValue:'true/false',
          defaultValue:'—'
        },{
          params:'slotName',
          describe:'插槽名称,当type为slot、outItemSlot、groupLineSlot时 对应的插槽的名称',
          type:'string',
          optionValue:'—',
          defaultValue:'—'
        },{
          params:'labelSlot',
          describe:'标签文本是否使用插槽 如果使用插槽 默认插槽名称为表单项prop字段和Label的拼接，例如prop为name 则插槽名称为:nameLabel',
          type:'string',
          optionValue:'—',
          defaultValue:'—'
        },{
          params:'dicData',
          describe:'当type为select、radio、checkbox时对应渲染的数据集合',
          type:'Array',
          optionValue:'—',
          defaultValue:'[]'
        }

        ]
      }
    }
  }
</script>