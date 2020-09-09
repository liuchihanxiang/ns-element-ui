# ns-dialog弹窗
---
<Common-Democode title="基本用法" description="基本按钮用法">
  <Docs-dialog-demo1></Docs-dialog-demo1>
  <highlight-code slot="codeText" lang="vue">
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
  </highlight-code>
</Common-Democode>

<template>
  <Common-DemoApi type="attr" title="ns-dialog属性" :apiData="nsDialogApiData"></Common-DemoApi>
</template>

<script>
  export default {
    data(){
      return {
        nsDialogApiData:[
          {
          params:'showFullScreen',
          describe:'是否显示全屏图标',
          type:'Boolean',
          optionValue:'false/true',
          defaultValue:'false'
        },
        {
          params:'confirmBtn',
          describe:'是否显示确定按钮',
          type:'Boolean',
          optionValue:'false/true',
          defaultValue:'true'
        },{
          params:'confirmText',
          describe:'确定按钮文字',
          type:'string',
          optionValue:'-',
          defaultValue:'确定'
        },{
          params:'cancelBtn',
          describe:'是否显示取消按钮',
          type:'Boolean',
          optionValue:'false/true',
          defaultValue:'false'
        },{
          params:'cancelText',
          describe:'取消按钮文字',
          type:'string',
          optionValue:'-',
          defaultValue:'取消'
        }
        ]
      }
    }
  }
</script>

