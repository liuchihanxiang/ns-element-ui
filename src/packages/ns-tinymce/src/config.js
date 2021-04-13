// 编辑器 工具栏配置
export const toolbar = 'fullscreen preview removeformat code | fontselect | fontsizeselect | formatselect  | forecolor backcolor | bold  italic  underline  strikethrough | alignleft aligncenter alignright | outdent indent indent2em nonbreaking |  lineheight  bullist numlist  |   link  table image '

// 编辑器插件配置
export const plugins = ['advlist code image nonbreaking  autolink  code indent2em  fullscreen wordcount imagetools importcss  link lists noneditable  paste preview  table  textpattern visualblocks visualchars lineheight']

// 编辑器字体大小配置
export const fontsizeFormats = '12px 14px 16px 18px 20px 22px 26px 30px 36px'

// 编辑器 字体下拉配置项
export const fontFormats = `
微软雅黑=微软雅黑;
宋体=SimSun, STSong;
新宋体=NSimSun;
仿宋= FangSong_GB2312, FangSong, STFangsong;
楷体=KaiTi_GB2312, KaiTi, STKaiti;
黑体= SimHei, STHeiti;
隶书=隶书;
Arial=Arial;
Arial Black=Arial Black;
Times New Roman=Times New Roman;
Courier New=Courier New
`

export const blockFormats = '正文=p;一级标题=h1;二级标题=h2;三级标题=h3'

// 编辑器自定义样式
export const contentStyle = `
*                         { padding:0; margin:0; }
html, body                { height:100%; font-size:14px;font-family: '微软雅黑'!important;margin:0!important;box-sizing: border-box; }
body                      {padding:10px; }
img                       { max-width:100%;height:auto; }
a                         { text-decoration: none; }
iframe                    { width: 100%; }
table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
.mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
ul,ol                     { list-style-position:inside; }
::-webkit-scrollbar{
  width: 5px;
  height: 5px;
  background-color: #F5F5F5;
}
.mceNonEditable{
  padding:2px 10px;
  display: inline-block;
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 20px;
  outline: none;
  background: red;
  color: #fff;
  margin:0 1px;
}


/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #F5F5F5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb{
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
  background-color: #c8c8c8;
}
`
