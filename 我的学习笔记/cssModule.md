 ## cssmodules中引入其他文件或者本文件中的其他样式
【className】中的样式将复制给xxx的样式

其他文件
xxx {
composes: 【className】 from "./test.less"; 
}

本文件
xxx {
composes: 【className】
}

本文件 还可以
xxx {
  .[className]()
}

