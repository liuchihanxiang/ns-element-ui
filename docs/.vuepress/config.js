module.exports = {
  title: 'ns-element-ui',
  base: '/ns-element-ui/',
  description: '基于element-ui的二次封装',
  port: 8083, 
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '组件', link: '/component/guide/introduction' },
      { text: '主题', link: '/theme/' }
    ],
    sidebar: {
      '/component/': [
        {
          title: '开发指南',
          collapsable: false,
          children: [
            'guide/introduction'
            // 'guide/guide'
          ]
        },
        {
          title: 'nsForm 表单组件',
          collapsable: false,
          children: [
            {title:'输入框',path:'basic/ns-form/input'},
            {title:'下拉选',path:'basic/ns-form/select'},
            {title:'分组',path:'basic/ns-form/group'},
            {title:'富文本编辑器',path:'basic/ns-form/editor'},
            {title:'api',path:'basic/ns-form/api'}
          ]
        },
        {
          title: 'nsTable 表格组件',
          collapsable: false,
          children: [
            {title:'基础表格',path:'basic/ns-table/searchForm'},
            {title:'vxe高级表格',path:'basic/ns-table/vxe-grid'},
            {title:'api',path:'basic/ns-table/api'}
          ]
        },
        {
          title: 'nsDialog 弹窗',
          collapsable: false,
          children: [
            'basic/dialog'
          ]
        }
      ]
    }
  }
}
