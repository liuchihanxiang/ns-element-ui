<template>
  <div class="hello">
    <el-button type="tetx"
               @click="getData">看看</el-button>
    <ns-table ref="dataTable"
              :pagination="false"
              :tableData="tableData"
              :columns='columns'
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
      columns: [{
        prop: 'name',
        label: '是的'
      }, {
        label: '总的',
        children: [{
          prop: 'routerName',
          label: '路由'
        },
        {
          prop: 'isChangeMenu',
          label: '是否隐藏'
        },
        {
          prop: 'hidden',
          label: '所0得到的'
        },
        {
          prop: 'redirectName',
          label: '所得'
        },
        {
          prop: 'redirectName',
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
      }]
    }
  },
  methods: {
    getData () {
      console.log(this.baseForm)
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
