# ns-form表单
---
<Common-Democode title="select" >
  <Docs-NsForm-select></Docs-NsForm-select>
  <highlight-code slot="codeText" lang="vue">
    <template>
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
    </script>
  </highlight-code>
</Common-Democode>
