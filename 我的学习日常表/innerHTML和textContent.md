
 ## nodeValue：仅仅对CDATA片段，注释comment，Processing Instruction节点或text节点有效，对document, documentFragment, Element节点，返回值为null,也无法使用其进行内容的设置，如果要改变元素的文本节点，用element.childNodes[0].nodeValue

 ## innerHTML：浏览器会将内容解析为HTML，因此更慢



 ## textContent：使用纯文本而不是解析为html,更快捷.（比innerHTML安全）,如果在仅仅是要element节点改变文本，使用textContent。

 一、textcContent和nodeValue和innerHMLT在改变元素文本节点的区别：三者都能用，但使用nodeValue容易造成困惑，innerTMLHTML性能差点，使用textContent最佳。
————————————————
原文链接：https://blog.csdn.net/zhuanyemanong/article/details/80331493