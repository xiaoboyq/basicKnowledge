Promise.race = function(promises){
return new Promise((resolve, reject) => {
  if(!Array.isArray(promises)) {
    throw new Error('promises必须是一个数组')
  }

  let len = promises.length;

  for(let i = 0; i < len; i++) {
    Promise.resolve(promises[i]).then(res=> {
      resolve(res)
    })
    .catch(reason => {
      reject(reason)
    })
  }
})
}



Function.prototype.bind = function(obj, ...args) {
  let context = obj || null;
  let fn = this;
  let Bridge = function() {};
  const newFn = (...arg) => {
    return  fn.apply( this instanceof Bridge ? this : context, [...args, ...arg])
  }
  Bridge.prototype = fn.prototype; // 寄身组合继承
  newFn.prototype = new Bridge()


  return newFn
}

// function _new(fn, ...args) {
//     var obj = new Object();   // 此处不能用 new 
//     obj.__proto__ = fn.prototype;
//     let res =  fn.apply(obj, args);
//     return Object.prototype.toString.call(res) == '[object Object]' ? res : obj;
// } 


function _new() {
  let obj = {};
  let Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  let ret = Constructor.apply(obj, arguments);
  return typeof ret === "object" ? ret : obj;
 }
 

function _new(fn, ...args) {
  let obj = {};
  obj.__proto__ = fn.prototype;
  let res = fn.apply(obj, args)
  return Object.prototype.toString.call(res) === '[object Object]' ?  res : obj
}