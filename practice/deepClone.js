function deepClone(obj, map = new WeakMap()) {
  if(!obj || typeof obj !== 'object') {
    return obj;
  }
  if(map.get(obj)) {
    return map.get(obj)
  }

  let res = Array.isArray(obj) ?  [] : {};
  map.set(obj, res)
  for(let key in obj) {
    res[key] =  deepClone(obj[key], map)
  }

  return res;
 }

const data =  {
  field1: 1,
  field2: undefined,
  field3: {
      child: 'child',
      fn: function() {
        console.log(12312)
      }
  },
  field4: [2, 4, 8],

};
data.data = data


let res = deepClone(data)
res.field3.fn()