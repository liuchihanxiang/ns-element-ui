// 编辑器 工具栏配置
export const toolbar = ['undo redo | bold  italic  underline  strikethrough  forecolor backcolor | fontselect | formatselect | fontsizeselect | styleselect | alignleft aligncenter alignright outdent indent  blockquote | removeformat subscript superscript hr bullist numlist link  charmap preview anchor pagebreak insertdatetime  table   fullscreen']

// 编辑器插件配置
export const plugins = ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount']

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
幼圆=幼圆;
Andale Mono=andale mono,times;
Arial=arial, helvetica,
sans-serif;
Arial Black=arial black, avant garde;
Book Antiqua=book antiqua,palatino;
Comic Sans MS=comic sans ms,sans-serif;
Courier New=courier new,courier;
Georgia=georgia,palatino;
Helvetica=helvetica;
Impact=impact,chicago;
Symbol=symbol;
Tahoma=tahoma,arial,helvetica,sans-serif;
Terminal=terminal,monaco;
Times New Roman=times new roman,times;
Trebuchet MS=trebuchet ms,geneva;
Verdana=verdana,geneva;
Webdings=webdings;
Wingdings=wingdings,zapf dingbats`

// 编辑器自定义样式
export const contentStyle = `
*                         { padding:0; margin:0; }
html, body                { height:100%; }
img                       { max-width:100%;height:auto; }
a                         { text-decoration: none; }
iframe                    { width: 100%; }
p                         { line-height:1.6; margin: 0px; }
table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
.mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
ul,ol                     { list-style-position:inside; }
`

// 编辑自定义格式
export const styleFormats = [{
  title: '行高',
  items: [
    { title: '1', styles: { 'line-height': '1' }, inline: 'span' },
    { title: '1.5', styles: { 'line-height': '1.5' }, inline: 'span' },
    { title: '2', styles: { 'line-height': '2' }, inline: 'span' },
    { title: '2.5', styles: { 'line-height': '2.5' }, inline: 'span' },
    { title: '3', styles: { 'line-height': '3' }, inline: 'span' }
  ]
}]
