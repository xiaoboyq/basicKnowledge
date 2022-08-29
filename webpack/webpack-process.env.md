<!-- https://www.jianshu.com/p/19d199f93045 -->

# process.nev
webpack 4.0中配置环境变量时， 
用到node的api process.env 来区别和获取环境: 开发环境、集成环境、生产环境等
针对不同的环境进行相应策略的打包（比如是否替换接口地址，代码是否压缩等）。webpack就是通过process.env属性加以区分。
webpack的运行依赖于node的环境
这里的process.env就是Nodejs提供的一个API，它返回一个包含用户环境信息的对象。如果我们给Nodejs 设置一个环境变量，并把它挂载在 process.env 返回的对象上，便可以在代码中进行相应的环境判断。

process.env
返回一个对象，包含了所有shell脚本里面的环境变量；

## 使用之前要先设置环境变量：这里设置变量名为 NODE_ENV 当然也可以配置多个变量参数 比如接口地址 是否有权限这里的都可以在这里设置
在package.json中
```javascript
// 在Windows中
{
  ...
  "scripts": {
    "dev": "set NODE_ENV=development webpack-dev-server --open --hot",
    "build": "set NODE_ENV=production webpack --progress --hide-modules"
  }
}

// 在mac中
{
  ...
  "scripts": {
    "dev": "export NODE_ENV=development webpack-dev-server --open --hot",
    "build": "export NODE_ENV=production  webpack --progress --hide-modules"
  }
}
```


## webpack.config.js 中使用 【项目文件中都可以使用process.env.NODE_ENV】
```javascript
module.exports = {
  mode: process.env.NODE_ENV === "development" ? "development" : "production"
}
// NODE_ENV 是自定义的名字 可以随便设置名字
```


可以看出在windows系统和mac系统的配置是不一样的， 
此时 跨系统的cross-env 出现了
<!-- // npm i cross-env -D -->
## cross-env是一个跨平台设置环境变量的第三方包，它可以让你只配置一行命令，就能轻松地在多个平台设置环境变量
<!-- https://blog.csdn.net/weixin_45249263/article/details/123719280 -->
在package.json中
```javascript
// 在Windows或者mac中都可以使用
{
  ...
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot",
    "build": "cross-env  NODE_ENV=production webpack --progress --hide-modules"
  }
}
```


```javascript
 console.log(process.env)
 node中打印如下： 
{
  TERM_PROGRAM: 'vscode',
  TERM: 'xterm-256color',
  SHELL: '/bin/bash',
  TMPDIR: '/var/folders/zk/5kjswgsj4h5fm8msph5hvpwm0000gn/T/',
  TERM_PROGRAM_VERSION: '1.63.2',
  ORIGINAL_XDG_CURRENT_DESKTOP: 'undefined',
  USER: 'boyq',
  COMMAND_MODE: 'unix2003',
  SSH_AUTH_SOCK: '/private/tmp/com.apple.launchd.1Ihyf16x3H/Listeners',
  __CF_USER_TEXT_ENCODING: '0x1F5:0:0',
  PATH: '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin',
  __CFBundleIdentifier: 'com.microsoft.VSCode',
  PWD: '/Users/boyq/study/Web',
  LANG: 'zh_CN.UTF-8',
  VSCODE_GIT_ASKPASS_EXTRA_ARGS: '--ms-enable-electron-run-as-node',
  XPC_FLAGS: '0x0',
  XPC_SERVICE_NAME: '0',
  SHLVL: '2',
  HOME: '/Users/boyq',
  VSCODE_GIT_ASKPASS_MAIN: '/Users/boyq/Desktop/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass-main.js',
  LOGNAME: 'boyq',
  VSCODE_GIT_IPC_HANDLE: '/var/folders/zk/5kjswgsj4h5fm8msph5hvpwm0000gn/T/vscode-git-9c75487031.sock',
  VSCODE_GIT_ASKPASS_NODE: '/Users/boyq/Desktop/Visual Studio Code.app/Contents/MacOS/Electron',
  GIT_ASKPASS: '/Users/boyq/Desktop/Visual Studio Code.app/Contents/Resources/app/extensions/git/dist/askpass.sh',
  COLORTERM: 'truecolor',
  _: '/usr/local/bin/nodemon'
}

```