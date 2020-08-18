<template>
  <div>
    <ns-form v-model="formModel" :label-width="120" :form-list="formList">
      <template slot-scope="scope" slot="key12Label">
        <span>{{scope.column.label}}</span>
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
          url:'asdasd',
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
        return restaurant.value && restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },

    fetchSuggestions(queryString, cb) {
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },

    handleClick() {
      console.log(this.formModel)
    }
  }
}
</script>
