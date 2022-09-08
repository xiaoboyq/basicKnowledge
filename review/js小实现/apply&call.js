Function.prototype._apply = function(context, args = []) {
  let ctx = context || window;
  let fn = Symbol()
  ctx[fn] = this;
  const res = args.length? ctx[fn](...args) : ctx[fn]()
  delete ctx[fn]
  return res
}

function a() {
 let res = [].sort._apply(arguments) // [Arguments] { '0': 1, '1': 2, '2': 3, '3': 4, '4': 55 }
//  const res = [].shift._apply(arguments); // 1

 console.log(res)
}

a(1,2,3,55,4)

Function.prototype._call = function(context, ...args) {
  let ctx =  context || window;
  let fn = Symbol();
  ctx[fn] = this;
  let res = args.length ?  ctx[fn](...args) : ctx[fn];
  delete ctx[fn]
  return res
}