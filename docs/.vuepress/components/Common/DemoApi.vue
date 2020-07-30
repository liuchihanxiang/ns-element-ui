<template>
  <div class="api-wrap">
    <h3>{{title}}</h3>
    <el-table v-if="type === 'attr'" :data="apiData" stripe style="width: 100%">
      <el-table-column prop="params" label="参数" width="140"></el-table-column>
      <el-table-column prop="describe" label="说明"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="optionValue" label="可选值"></el-table-column>
      <el-table-column prop="defaultValue" label="默认值"></el-table-column>
    </el-table>
    <el-table v-else :data="apiData" stripe style="width: 100%">
      <el-table-column prop="params" label="事件名称" width="140"></el-table-column>
      <el-table-column prop="describe" label="说明"></el-table-column>
      <el-table-column prop="cbparams" label="回调参数"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'DemoApi',
  props: {
    type: {
      type: String,
      default: 'attr'
    },
    title: {
      type: String,
      default: '属性'
    },
    apiData: Array
  }
}
</script>

<style lang="scss">
.api-wrap {
  table {
    margin: 0;
    padding: 0;
    td,
    th {
      text-align: center;
    }
  }
  + .api-wrap {
    margin: 40px 0;
  }
  &:first-child {
    margin-top: 80px;
  }
  &:last-child {
    margin-bottom: 80px;
  }
}
</style>
