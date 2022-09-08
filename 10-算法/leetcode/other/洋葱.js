// 实现⼀个简单的koa洋葱模型compose

let middleware = []
middleware.push((next) => {
  console.log(1)
  next()
  console.log(1.1)
})

middleware.push((next) => {
  console.log(2)
  next()
  console.log(2.1)
})

middleware.push((next) => {
  console.log(3)
  next()
  console.log(3.1)
})

let fn = compose(middleware)
fn()


function compose(middlewares) {
  let newMiddlewares = [...middlewares];
  let index = 0;

  const fn = () => {
    while(index < newMiddlewares.length) {
     const middleware = newMiddlewares[index];
     index++;
     middleware(fn)
    }
  }
  return fn
}

// 1
// 2
// 3
// 3.1
// 2.1
// 1.1


function compsoe(middlewares) {
  let moddlewareCopy = [...middlewares];
  let index = 0;
  const fn = function() {
    if(index >= moddlewareCopy.length) {
      return;
    }
    const middleware =  moddlewareCopy[index];
    index++;
    middleware(fn)
  }
  return fn ;
}
