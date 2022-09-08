// https://www.jianshu.com/p/651082962c2c
// Tapable就是webpack用来创建钩子的库。

const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook
} = require("tapable");

// welcome.js
const {SyncHook} = require('tapable');

module.exports = class Welcome { // welcome 类似webpack 中complier
    constructor(words) {
        this.words = words;
        this.sayHook = new SyncHook(['words']);
        this.sayAsyncHook = new AsyncSeriesHook(['words']);
    }

    // 进门回家的一系列行为
    begin() {
        console.log('开门');
        console.log('脱鞋');
        console.log('脱外套');
        // 打招呼
        this.sayHook.call(this.words);
        this.sayAsyncHook.call(this.words)
        // 注意，这里的.call()的方法是Tapable提供的触发钩子的方法，不是js中原生的call方法。
        console.log('关门');
    }
}

// run.js
const Welcome = require('./welcome');
const welcome = new Welcome('我回来啦！');
welcome.begin();

/**  output:
 * 开门
 * 脱鞋
 * 脱外套
 * 关门
 */


// say.js
module.exports = function (welcome) {
  welcome.sayHook.tap('say', words => {
      console.log('轻声说:', words);
  });
};

// shout.js
module.exports = function (welcome) {
  welcome.sayHook.tap('shout', words => {
      console.log('出其不意的大喊一声:', words);
  });
};


// run.js
const Welcome = require('./welcome');
const applyShoutPlugin = require('./shout');

const welcome = new Welcome('我回来啦！');
applyShoutPlugin(welcome);
welcome.begin();

/* output:
 * 开门
 * 脱鞋
 * 脱外套
 * 出其不意的大喊一声: 我回来啦！
 * 关门
 */


// 这样，我们就把打招呼的实现方式与welcome解耦了。我们也可以使用say.js模块，甚至和shout.js两者同时使用。这就好比创建了一个“可插拔”的系统机制 —— 我可以根据需求自主选择要不要打招呼，要用什么方式打招呼。
// 虽然上面的例子非常简单，但是已经可以帮助我们理解tapable的使用以及插件的思想。

