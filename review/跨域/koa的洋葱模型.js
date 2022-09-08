// const Koa = require('koa');
// const app = new Koa();

// // 中间件1
// app.use((ctx, next) => {
//     console.log(1);
//     next();
//     console.log(2);
// });

// // 中间件 2 
// app.use((ctx, next) => {
//     console.log(3);
//     next();
//     console.log(4);
// });

// app.listen(8000, '0.0.0.0', () => {
//     console.log(`Server is starting`);
// });

const middleware = []
let mw1 = async function (ctx, next) {
    console.log("next前，第一个中间件")
    await next()
    console.log("next后，第一个中间件")
}
let mw2 = async function (ctx, next) {
    console.log("next前，第二个中间件")
    await next()
    console.log("next后，第二个中间件")
}
let mw3 = async function (ctx, next) {
    console.log("第三个中间件，没有next了")
}

function use(mw) {
  middleware.push(mw);
}

use(mw1);
use(mw2);
use(mw3);

const fn = compose(middleware);

fn();

// compose  接受一个数组 返回一个函数

function compose(middlewares) {
  let newMiddlewares = [...middlewares];
  let len = newMiddlewares.length;
  let index  = 0

  const fn = (ctx) => {
    while(index < len) {
      let midddleware = newMiddlewares[index];
      index++;
      midddleware(ctx, fn)
    }
  }
  return fn
}