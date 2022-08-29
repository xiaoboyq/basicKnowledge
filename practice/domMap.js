// 遍历一个dom树

function traversal(node) {
  if(node&&node.nodeType === 1) {
    console.log(node.tagName)
  }
  var i = 0, childNodes=node.childNodes;
  for(; i < childNodes.length; i++) {
    item=childNodes[i];
    traversal(item)
  }
}