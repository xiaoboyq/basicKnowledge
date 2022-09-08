
// 利用虚拟代理实现图片预加载功能：
var myImage = (function(){
  var imageNode = document.createElement('img');
  document.body.appendChild(imageNode);
  return  function(src) {
      imageNode.src = src;
    }
})()

// myImage('./test/picture.png') // 正式需要加载的图片

var proxyImage = (function(){
  var img = new Image();
  img.onload = function() {
    myImage.setSrc(this.src)
  }

  return function(src) {
    myImage('./xxx/loading.gif')
    img.src = src;
  }
})()

proxyImage('./xxx.png')