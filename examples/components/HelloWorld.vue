<template>
  <div class="hello">
    <el-button type="tetx"
               @click="getData">看看</el-button>
    <ns-form :form-list="form"
             ref="baseForm"
             :is-international='false'
             :is-column-mixins="true"
             v-model="baseForm"
             :label-width='110' />
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
      form: [{
        prop: 'sd1',
        label: '是的'
      }, {
        prop: 'sd2',
        label: '是的ds'
      }, {
        type: 'editor',
        prop: 'sd3',
        label: '是的we'
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
