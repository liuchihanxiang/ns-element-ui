# ns-form表单
---
<Common-Democode title="input基本用法" >
  <Docs-NsForm-input></Docs-NsForm-input>
  <highlight-code slot="codeText" lang="vue">
    <template>
      `<template>
        <div>
          <ns-form v-model="formModel" :label-width="120" :form-list="formList">
            <template slot-scope="scope" slot="key12Label">
              <span>{scope.column.label}</span>
              <el-tooltip class="item" effect="dark" content="文字提示" placement="top-start">
                <i class="el-icon-warning"></i>
              </el-tooltip>
            </template>
          </ns-form>
        </div>
      </template>
      <script>
        import restaurants from './demo1Data'
        export default {
          data() {
            return {
              formModel: {},
              formList: [
                {
                  label: '基本输入框',
                  prop: 'key1',
                  placeholder: '请输入内容',
                  rules: [{ required: true, message: 'adsd' }]
                },
                {
                  label: '自定义label',
                  prop: 'key12',
                  labelSlot: true,
                  placeholder: '请输入内容',
                  rules: [{ required: true, message: 'adsd' }]
                },
                {
                  label: '带图标的输入框',
                  prop: 'key11',
                  prefixIcon: 'el-icon-search',
                  placeholder: '请输入内容'
                },
                {
                  label: '带输入建议',
                  type: 'autocomplete',
                  prop: 'key111',
                  placeholder: '请输入内容',
                  fetchSuggestions: this.fetchSuggestions
                },
                {
                  type: 'password',
                  label: '密码',
                  prop: 'key2',
                  showPassword: true,
                  placeholder: '请输入密码'
                },
                {
                  type: 'textarea',
                  label: '文本域',
                  prop: 'key3',
                  maxlength: 500,
                  autosize: {
                    minRows: 4,
                    maxRows: 10
                  },
                  placeholder: '请输入内容'
                }
              ]
            }
          },
          methods: {
            createFilter(queryString) {
              return restaurant => {
                return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
              }
            },
            fetchSuggestions(queryString, cb) {
              console.log(restaurants, queryString)
              var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
              cb(results)
            },
            handleClick() {
              console.log(this.formModel)
            }
          }
        }
      </script>`
    </template>
  </highlight-code>
</Common-Democode>
<Common-Democode title="select" >
  <Docs-NsForm-select></Docs-NsForm-select>
  <highlight-code slot="codeText" lang="vue">
    <template>
      `<template>
        <div style="width:100%;">
          <ns-form v-model="formModel" :label-width="120" :form-list="formList"></ns-form>
        </div>
      </template>
      <script>
      export default {
        data() {
          const SEX = [
            {
              value: '0',
              label: '男'
            },
            {
              value: '1',
              label: '女'
            }
          ]
          const DATATYPE = [
            {
              value: '1',
              label: '任务书'
            },
            {
              value: '2',
              label: '季度工作总结'
            },
            {
              value: '3',
              label: '述职报告'
            },
            {
              value: '4',
              label: '重大事件记录'
            }
          ]
          const restaurants = [
            { name: '三全鲜食（北新泾店）', code: 'code001' },
            { name: 'Hot honey 首尔炸鸡（仙霞路）', code: 'code002' },
            { name: '新旺角茶餐厅', code: 'code003' },
            { name: '泷千家(天山西路店)', code: 'code004' },
            { name: '胖仙女纸杯蛋糕（上海凌空店）', code: 'code0049' },
            { name: '贡茶', code: 'code0016' },
            { name: '豪大大香鸡排超级奶爸', code: 'code006' },
            { name: '茶芝兰（奶茶，手抓饼）', code: 'code007' },
            { name: '十二泷町', code: 'code008' },
            { name: '星移浓缩咖啡', code: 'code009' },
            { name: '阿姨奶茶/豪大大', code: 'code010' },
            { name: '新麦甜四季甜品炸鸡', code: 'code011' },
            { name: 'Monica摩托主题咖啡店', code: 'code012' },
            { name: '浮生若茶（凌空soho店）', code: 'code013' },
            { name: 'NONO JUICE  鲜榨果汁', code: 'code014' },
            { name: 'CoCo都可(北新泾店）', code: 'code015' }
          ]
          return {
            formModel: {},
            formList: [
              {
                label: '性别',
                prop: 'key1',
                type: 'select',
                dicData: SEX,
                placeholder: '请选择性别'
              },
              {
                label: '多选',
                prop: 'key2',
                type: 'select',
                collapseTags: true,
                multiple: true,
                dicData: DATATYPE,
                placeholder: '请选择'
              },
              {
                label: '可搜索',
                prop: 'key3',
                type: 'select',
                collapseTags: true,
                dicData: restaurants,
                multiple: true,
                valueKey: 'code',
                labelKey: 'name',
                filterable: true,
                placeholder: '请选择'
              }
            ]
          }
        }
      }
      </script>`
    </template>
  </highlight-code>
</Common-Democode>
<Common-Democode title="表单分组" >
  <Docs-NsForm-group></Docs-NsForm-group>
  <highlight-code slot="codeText" lang="vue">
    <template>
     ` <template>
        <div>
          <ns-form v-model="formModel" :label-width="120" :form-list="formList">
            <template slot="groupLineSlot">
              <span>
                <i class="el-icon-mobile-phone"></i> 这个是自定义的分割线
              </span>
            </template>
          </ns-form>
        </div>
      </template>
      <script>
      export default {
        data() {
          return {
            formModel: {},
            formList: [
              {
                label: '基本输入框',
                prop: 'key1',
                placeholder: '请输入内容',
                rules: [{ required: true, message: 'adsd' }]
              },
              {
                type: 'groupLine',
                title: '我是分割线',
                position: 'center'
              },
              {
                type: 'password',
                label: '密码',
                prop: 'key2',
                showPassword: true,
                placeholder: '请输入密码'
              },
              {
                type: 'groupLineSlot',
                slotName: 'groupLineSlot',
                title: '分割线标题'
              },
              {
                type: 'textarea',
                label: '文本域',
                prop: 'key3',
                maxlength: 500,
                autosize: {
                  minRows: 4,
                  maxRows: 10
                },
                placeholder: '请输入内容'
              }
            ]
          }
        }
      }
      </script>`
    </template>
  </highlight-code>
</Common-Democode>

::: tip
新版本input默认最大字数限制为20，textarea默认最大字数限制为500，并且默认显示字数限制
:::

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
          params:'isColumnMixins',
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
