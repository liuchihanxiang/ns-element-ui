// 编辑器 工具栏配置
export const toolbar = 'fullscreen preview removeformat | fontselect | fontsizeselect  | forecolor backcolor | bold  italic  underline  strikethrough | alignleft aligncenter alignright | outdent indent |  lineheight  bullist numlist | formatselect | link hr |  subscript superscript |    charmap  anchor pagebreak |  insertdatetime  table'

// 编辑器插件配置
export const plugins = ['advlist anchor autolink autosave code codesample directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template  textpattern visualblocks visualchars lineheight ax_wordlimit']

// 编辑器字体大小配置
export const fontsizeFormats = '10px 11px 12px 14px 16px 18px 20px 24px'

// 编辑器 字体下拉配置项
export const fontFormats = `
微软雅黑=微软雅黑;
宋体=宋体;
黑体=黑体;
仿宋=仿宋;
楷体=楷体;
隶书=隶书;
`

// 编辑器自定义样式
export const contentStyle = `
*                         { padding:0; margin:0; }
html, body                { height:100%;    font-family: '宋体'; }
img                       { max-width:100%;height:auto; }
a                         { text-decoration: none; }
iframe                    { width: 100%; }
table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
.mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
ul,ol                     { list-style-position:inside; }
`
