function sandBox() {
  this.cacheMyMap = new Map(); // 这个是缓存的我自己的windows上的方法或属性
  this.cacheWindow = new Map();
};
sandBox.prototype.show = function() {
  for (let i in window) { // 缓存当前window的方法或属性
    this.cacheWinow.set(i, window[i]); 
  }
  const keys = Object.keys(this.cacheMyMap);
  for (let i = 0; i < keys.length; i++) {
    window[keys[i]] = this.cacheWindow.get(keys[i]);
  }
};
sandBox.prototype.hide = function() {
  const keys = Object.keys(window);
  keys.forEach((item) => {
    this.cacheMyMap.set(item, window[item]);
  });
};

const diffSandbox = new DiffSandbox('diff沙箱');
diffSandbox.show();  // 激活沙箱
window.a = '1'
console.log('开启沙箱：',window.a);
diffSandbox.hide(); //失活沙箱
console.log('失活沙箱：', window.a);
diffSandbox.show();   // 重新激活
console.log('再次激活', window.a);