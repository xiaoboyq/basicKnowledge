// // 期望结果：
// const tmp = {a: {b: {c: [{d:1}, {e:2}, {f: {k: 3, p: 7}}]}}, v: ''}
// // getIn(tmp, ['a', 'b', 'c'], 'alipay') // [{d:1}, {e:2}, {f: {k: 3, p: 7}}
// getIn(tmp, ['a', 'b', 'c', '0', 'd'], 'alipay'); //-> 1
// getIn(tmp, ['a', 'z'], 'alipay');// -> 'alipay'

// function getIn(data, array, initial)  {
//   let res = initial
//   let obj = data
//   array.forEach((element, index) => {
//     if(obj[element]&& index === array.length - 1) {
//       return res = obj[element]
//     }
//     obj = obj[element]
//   });

//   return res
// }

add(1,2)(3)(4,5)(6).toValueOf()  //-> 21


// function _add(...args) {
//   const newFn = (...newArga) => {
    
//   }
//   newFn.toValueOf = function () {

//   }

//   return newFn
// }


function add( ...arg) {
  let args = [...arg]
  return function(...arguments) {
    args = [...args, ...arguments];
    if(args.length < 6) {
      return add(...args)
    } else {
      let res = 0;
     for (let i = 0; i < args.length; i++) {
       res += args[i]
     }
     let obj = {
      toValueOf: function() {
        return res.valueOf()
      }
    }
     return  obj
    }
  }

}