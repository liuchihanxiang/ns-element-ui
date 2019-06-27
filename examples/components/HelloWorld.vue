<template>
  <div class="hello">
    <el-button type="tetx"
               @click="getData">看看</el-button>
    <ns-table ref="dataTable"
              :tableData="tableData"
              :columns='columns'
              :operations="operation">
    </ns-table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      baseForm: {},
      columns: [{
        prop: 'sd1',
        label: '是的'
      }, {
        prop: 'sd2',
        label: '是的ds'
      }, {
        type: 'editor',
        prop: 'sd3',
        label: '是的we'
      }],
      operation: [{
        text: '添加'
      },
      {
        text: '添加1'
      }],
      tableData: [{
        sd1: '0是的撒1',
        sd2: '0是的撒2',
        sd3: '0是的撒3'
      },
      {
        sd1: '1是的撒1',
        sd2: '1是的撒2',
        sd3: '1是的撒3'
      }, {
        sd1: '2是的撒1',
        sd2: '2是的撒2',
        sd3: '2是的撒3'
      }, {
        sd1: '3是的撒1',
        sd2: '3是的撒2',
        sd3: '3是的撒3'
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
