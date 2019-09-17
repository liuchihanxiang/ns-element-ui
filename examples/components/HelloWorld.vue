<template>
  <div class="hello">
    <el-button type="tetx"
               @click="getData">看看</el-button>
    <ns-table ref="dataTable"
              :operationsAutoDropdown="false"
              :pagination="false"
              treeTable
              :operationsConfig="{
                fixed:'right',
                onlyShowIcon:false,
                autoDropdown:false,
                width:600
              }"
              :form-list="form"
              :tableData="tableData"
              :columns='columns'
              search='client'
              :operations="operation">
    </ns-table>
  </div>
</template>

<script>

import { data } from './json'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      baseForm: {},
      form: [{
        prop: 'name',
        label: '是的'
      }, {
        prop: 'permissionCode',
        label: '是的we'
      }],
      columns: [{
        prop: 'name',
        label: '是的',
        align: 'left'
      }, {
        label: '总的',
        children: [
          {
            prop: 'isChangeMenu',
            label: '是否隐藏'
          },
          {
            prop: 'hidden',
            label: '所0得到的'
          },
          {
            prop: 'permissionCode',
            label: '所得'
          },
          {
            prop: 'name',
            label: '所得11'
          }]
      }, {
        prop: 'permissionCode',
        label: '是的we'
      }],
      tableData: data,
      operation: [{
        text: '阿萨德',
        judges: 'row.type==="0"'
      }, {
        text: 'dsd',
        click: this.handleClick
      }, {
        text: '撒大声地1',
        click: this.handleClick
      }, {
        text: '撒大声地2',
        click: this.handleClick
      }, {
        text: '撒大声地3',
        click: this.handleClick,
        btnType: 'danger'
      }]
    }
  },
  methods: {
    getData () {
      this.baseForm = {
        'sd1': '多岁的',
        'sd2': '撒大声地',
        'sd3': '<p>撒打算打算大所多所多</p>'
      }
    },
    handleClick (a, b, c) {
      console.log(a, b, c)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
