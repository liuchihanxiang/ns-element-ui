<template>
  <div class="hello">
    <el-button type="tetx"
               @click="getData">看看</el-button>
    <ns-table ref="dataTable"
              treeTable
              :pagination="false"
              :tableData="tableData"
              :columns='columns'
              :operations="operation">
    </ns-table>

    <el-table :data="tableData"
              style="width: 100%;margin-bottom: 20px;"
              row-key="id"
              border
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="name"
                       label="日期"
                       sortable
                       width="180">
      </el-table-column>
      <el-table-column prop="routerName"
                       label="姓名"
                       sortable
                       width="180">
      </el-table-column>
      <el-table-column prop="isChangeMenu"
                       label="地址">
      </el-table-column>
    </el-table>
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
      list: [{
        'id': '22532967539410944',
        'deleteFlag': '0',
        'enableFlag': '1',
        'createUserId': '20775871662393344',
        'createUserName': 'zc',
        'createTime': '2019-06-13 17:34:59',
        'updateUserId': '20775871662393344',
        'updateUserName': 'zc',
        'updateTime': '2019-06-13 17:34:59',
        'sn': '0',
        'name': '测试菜单可以随意删除和修改',
        'type': '0',
        'url': '瓦哒哒',
        'permissionCode': '啊我的哇',
        'parentId': '0',
        'icon': 'home',
        'routerName': '瓦大我',
        'redirectName': '瓦大我',
        'isChangeMenu': false,
        'menuMoudle': '啊我的哇',
        'hidden': false,
        'children': [
          {
            'id': '22532973007079424',
            'deleteFlag': '0',
            'enableFlag': '1',
            'createUserId': '20775871662393344',
            'createUserName': 'zc',
            'createTime': '2019-06-13 17:35:41',
            'updateUserId': '20615556512614400',
            'updateUserName': '诺姆四达',
            'updateTime': '2019-06-17 10:50:02',
            'sn': '0',
            'name': '瓦大费网费123',
            'type': '0',
            'url': '瓦大',
            'permissionCode': '瓦大',
            'parentId': '22532967539410944',
            'icon': '瓦大',
            'routerName': '瓦大的哇大',
            'redirectName': '大唔大',
            'isChangeMenu': false,
            'menuMoudle': '瓦大a',
            'hidden': false
          }
        ]
      }],
      columns: [{
        prop: 'name',
        label: '是的'
      }, {
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
