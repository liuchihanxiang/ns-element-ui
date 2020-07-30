<template>
  <div style="width:100%">
    <ns-table
      :formList="formList"
      :btnList="btnList"
      :permit="filterBtn"
      :pagination="false"
      :operationsConfig="{
      onlyShowIcon:false
    }"
      :operations="operations"
      :tableData="tableData"
      :columns="columns"
    ></ns-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      permissionBtn: { add: '创建', del: '删除' },
      formList: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'name1',
          label: '哈哈'
        },
        {
          prop: 'name5',
          label: '下达'
        }
      ],
      btnList: [
        {
          text: '权限add',
          click: this.btn1Click,
          code: 'add'
        },
        {
          text: '没取到1',
          click: this.btn1Click,
          code: 'rer'
        }
      ],
      columns: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'date',
          label: '日期'
        },
        {
          prop: 'address',
          label: '地址'
        }
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      operations: [
        {
          icon: 'el-icon-delete',
          text: '新增',
          code: 'add'
        },
        {
          icon: 'el-icon-delete',
          text: '删除',
          code: 'del'
        }
      ]
    }
  },
  methods: {
    btn1Click() {
      this.$message({
        message: '点击啦'
      })
    },
    filterBtn(code) {
      return this.permissionBtn[code]
    }
  }
}
</script>
<style lang="scss">
table {
  margin: 0;
}
</style>
