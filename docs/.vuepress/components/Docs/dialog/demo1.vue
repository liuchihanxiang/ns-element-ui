<template>
  <div>
    <el-button type="text" @click="show=true">点击打开（可设置显示最大化最小化）</el-button>
    <br />
    <el-button type="text" @click="show2=true">点击打开自定义表头</el-button>
    <ns-dialog :visible.sync="show" showFullScreen title="我是标题" :area="['600px','auto']">
      <span>我是内容</span>
    </ns-dialog>
    <ns-dialog :visible.sync="show2" showFullScreen :area="['600px','auto']">
      <template slot="title">
        <h3 style="color:red">我是标题</h3>
      </template>
      <span>我是内容</span>
    </ns-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      show2: false
    }
  }
}
</script>
