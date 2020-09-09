# 表单分组
---
<Common-Democode title="表单分组" >
  <Docs-NsForm-group></Docs-NsForm-group>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <div>
        <ns-form v-model="formModel" :label-width="120" :form-list="formList">
          <template slot="groupLineSlot">
            <span>
              <i class="el-icon-mobile-phone"></i> 这个是自定义的分割线
            </span>
          </template>
        </ns-form>
      </div>
    </template>
    <script>
    export default {
      data() {
        return {
          formModel: {},
          formList: [
            {
              label: '基本输入框',
              prop: 'key1',
              placeholder: '请输入内容',
              rules: [{ required: true, message: '请输入内容' }]
            },
            {
              type: 'groupLine',
              title: '我是分割线',
              position: 'center'
            },
            {
              type: 'password',
              label: '密码',
              prop: 'key2',
              showPassword: true,
              placeholder: '请输入密码'
            },
            {
              type: 'groupLineSlot',
              slotName: 'groupLineSlot',
              title: '分割线标题'
            },
            {
              type: 'textarea',
              label: '文本域',
              prop: 'key3',
              maxlength: 500,
              autosize: {
                minRows: 4,
                maxRows: 10
              },
              placeholder: '请输入内容'
            }
          ]
        }
      }
    }
    </script>
  </highlight-code>
</Common-Democode>
