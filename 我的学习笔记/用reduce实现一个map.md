# reduce

# map 接受2个参数 一个函数， 一个执行函数时值被用作this的参数  返回一个新数组 

```javascript
Array.prototype._map = function(fn, thisArg) {
  let res = [];
  this.reduce((pre, val, index, arr)=>{
    res.push(fn.call(thisArg, val, index, arr))
  }, null)
  return res
}
```

array.map(()=>{})