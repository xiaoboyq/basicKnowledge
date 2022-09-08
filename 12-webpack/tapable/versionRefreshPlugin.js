// 这里可以在 pageVersion中动态插入更新时间， 或者动态生成版本号， 在html 中动态加入获取这个的代码
const fs = require('fs');
const path = require('path')
const moment = require('moment')

class VersionRefresh {
  // constructor(option) {
  //   this.option = option;
  // }
  apply(compiler) {

    // 如果用package中的version 
    compiler.hooks.beforeRun.tapAsync('AppVersion', (_, cb) => { // 开始的时候 像文件中添加
      let hascacheVersion = false; // 标注已经生成过version
      let exist = fs.existsSync(path.resolve(__dirname, `../public`));
      if (!exist) {
        fs.mkdirSync(path.resolve(__dirname, `../public`));
      }
      const versionPath = path.resolve(__dirname, `../public/pageVersion.json`)
      if (!fs.existsSync(versionPath)) { // 如果不存在版本信息 先添加 以免 readfile报错
        fs.writeFileSync(versionPath, JSON.stringify({ version: 0, updateTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss') }), 'utf8', (err) => {
          console.log('初始化版本设置成功')
        })
      } else {
        hascacheVersion = true
      }
      fs.readFile(versionPath, 'utf8', (err, data) => {
        let versionInfo = {};
        if (!err) {
          versionInfo = JSON.parse(data);
        }
        if (typeof versionInfo.version !== 'number') {
          versionInfo.version = 0;
        }
        if (hascacheVersion) { // 如果已经存在版本 更新版本
          const versionID = (versionInfo.version || 0) + 1;
          versionInfo.version = versionID;

          fs.writeFile(versionPath, JSON.stringify({ ...versionInfo, version: versionID,  updateTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss') }), 'utf8', (err) => {
            console.log('版本更新成功')
          })
          cb()
          return
        } 
        const appPath = path.resolve(__dirname, `../src/app.js`)
        let appContent = ''
        fs.readFile(appPath, 'utf8', (err, data) => {
          appContent += data
          // 这里可以生成文件 在app.js中引用
    appContent += `
    const AppVersion = require('../public/pageVersion.json')

    fetch('/pageVersion.json?_='+Date.now()).then(res => res.json())
    .then(res => {
      if (res.version && AppVersion.version !== res.version) {
        // 这里可以自定义检查到版本更新后的展示形式【message提示，或者自动刷新等自定义逻辑】
        console.log('当前页面已经过期，最近更新时间为'+res.updateTime+'，请手动刷新浏览器页面以便获取更好体验')
      }
    })
      `
          fs.writeFile(appPath, appContent, 'utf8', (err) => {
            console.log('更新app成功')
          })
          cb()
        })
      })
    });

  }
}
exports = module.exports = VersionRefresh;
