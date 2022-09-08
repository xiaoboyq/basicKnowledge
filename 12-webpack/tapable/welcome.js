const {SyncHook, AsyncSeriesHook} = require('tapable');

module.exports = class Welcome { // welcome 类似webpack 中complier
    constructor(words) {
        this.words = words;
        this.sayHook = new SyncHook(['words']);
        // this.sayAsyncHook = new AsyncSeriesHook(['words']);
    }

    // 进门回家的一系列行为
    begin() {
        console.log('开门');
        console.log('脱鞋');
        console.log('脱外套');
        // 打招呼
        this.sayHook.call(this.words);
        // this.sayAsyncHook.call(this.words)
        // 注意，这里的.call()的方法是Tapable提供的触发钩子的方法，不是js中原生的call方法。
        console.log('关门');
    }
}
