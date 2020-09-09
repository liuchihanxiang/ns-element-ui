<template>
  <div>
    <ns-form v-model="formModel" :label-width="120" :form-list="formList"></ns-form>
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
          label: '文章',
          prop: 'key1',
          type: 'editor'
        },
        {
          label: '自定义工具栏',
          prop: 'key1',
          type: 'editor',
          init: {
            toolbar: ['forecolor backcolor | bold  italic  underline  strikethrough | alignleft aligncenter alignright | outdent indent |  fontselect | formatselect | fontsizeselect|']
          }
        }
      ]
    }
  }
}
</script>
