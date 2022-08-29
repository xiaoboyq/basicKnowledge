// const Welcome = require('./welcome');
// const welcome = new Welcome('我回来啦！');
// welcome.begin();

const Welcome = require('./welcome');
const applyShoutPlugin = require('./shout');
// const applySayPlugin = require('./say');

const welcome = new Welcome('我回来啦！'); // Compiler 实例
applyShoutPlugin(welcome); // 将当前Compiler传到插件中去
// applySayPlugin(welcome);
welcome.begin();