function deepClone(obj, objMap = new Map) {
  if(typeof obj !== 'object') {
    return obj
  }


  if(objMap.has(obj)) {
    return objMap.get(obj)
  }

  let result = {};

  if (
    obj instanceof Array ||
    // 加 || 的原因是为了防止 Array 的 prototype 被重写，Array.isArray 也是如此
    Object.prototype.toString(obj) === "[object Array]"
  ) {
    result = [];
  }

  objMap.set(obj, result)
  
  for(let v in obj) {
    if(obj.hasOwnPrototype(v)) {
      result[v] = deepClone(obj[v], objMap)
    }
  }

  return result
}

const obj = { key: 123, obj1: {name: 123}}
console.log(deepClone(obj))