// 那vue的数组是怎么处理的？简单模拟一下对数组方法的监听？
// 要求最终输入的如下方代码所示


const render = (action, ...val) =>{
  console.log(`Action = ${action}, args = ${val}`);
}


const objProperty = Array.prototype;
const newObjProperty =  Object.create(objProperty);
['push', 'pop','shift','unshift','splice','sort','reverse'].forEach(item=>{
  newObjProperty[item] = function() {
    objProperty[item].call(this,...arguments)
    // 触发渲染|输出
    render(item, ...arguments)
  }
})

const reactive = (obj) => {
  if(Array.isArray(obj)) {
    obj.__proto__ = newObjProperty
  }
}

const data = [1,2,3,4];

reactive(data)


data.push(5) // Action = push, args = 5
data.splice(0, 2) // Action = splice, args = 0,2


/**Object.create
 * 
 *Object.create = function (o) {
 *  let F = function() {}; 
 *  F.prototype = o;
 *  let newObj = new F();
 *  return newObj;    // 即 newObj.__proto__ = F.prototype = o
 * }
 * */
