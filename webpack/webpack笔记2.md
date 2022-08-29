# scope hoisting 
  webpack mode 为 production 默认开启
  简单的把scope hoisting理解为是把每个模块被webpack处理成的模块初始化函数整理到一个统一的包裹函数里，也就是把多个作用域用一个作用域取代，以减少内存消耗并减少包裹块代码，从每个模块有一个包裹函数变成只有一个包裹函数包裹所有的模块，但是有一个前提就是，当模块的引用次数大于1时，比如被引用了两次或以上，那么这个效果会无效，也就是被引用多次的模块在被webpack处理后，会被独立的包裹函数所包裹
  即 是把许多个作用域，用一个作用域取代 这样可以减少内存消耗，同时可以把包裹块代码减少

  ## 内联进来，就是放在了同一个作用域下面，如果有多个变量，会导致命名冲突，会给这些适当的重命名。这样就减少了内存的开销


# 懒加载js脚本方式
  1. comonjs: require.ensure
  2. es6: import【还没有原生支持，需要babel转化】
  静态 import xx form 'xx' // 静态加载 

  动态import : 返回的是一个promise对象 ｜｜ 其实也是通过jsonp请求的动态资源
  if(xxx) {
    import('xxx').then(res=>{

    })
  }
  <!-- npm install @babel/plugin-syntax-dynamic-import --save-dev -->
  "plugins": ["@babel/plugin-syntax-dynamic-import"],

  会单独生成一个chunks; 当要引用的时候才会去动态的加载


# Eslint 如何落地
  1. webpack和CI/CD系统集成
  2. webpack 与 ESLint 集成

  ## 方案1 webpack 与 CI/CD 集成 【CI/CD  持续集成/持续部署】
  更适合对老项目的维护， 对老的代码不进行eslint 只对提交的
  ```javascript
  本地开发阶段增加precommit钩子
  安装 husky
  npm i husky -D
  增加 npm script，通过 lint-staged 增量检查修改的⽂件
  // npm install husky --save-dev
  "scripts": {
  "precommit": "lint-staged"
  },
  "lint-staged": {
    "linters": {
    "*.{js,scss}": ["eslint --fix", "git add"]
    }
  },
  ```
  ## 方案2  webpack 与 ESLint 集成 
  默认会对所有test的文件使用
  ```javascript
  使⽤ eslint-loader，构建时检查 JS 规范
  module.exports = {
    module: {
      rules: [
        {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          "eslint-loader"
          ]
        }
      ]
    }
  };
  ```

  .eslintrc.js 设置


  # CI/CD
  持续集成、持续部署等持续动作。
  CI全名Continuous Integration，啥意思？就是我们经常听到的持续集成概念。
  当开发每天会提交多次代码到主干上，会做一些重复性的动作时，就可以用持续集成环境来操作。
  有集成了，就肯定少不了它的好基友，没错就是CD。
  CD全名是Continuous Deployment，是持续部署。
  CD还有个小号，叫持续交付，英文全称是Continuous delivery，缩写也是CD。

  CI/CD优点是，重复的工作用自动化来代替、减少时间成本、版本发布时间减短了。

  现在很多公司都有做持续集成，Jenkins就是一个持续集成的工具，开源的，基于 JAVA语言的。


# 多进程并行压缩代码
  ```javascript
  const TerserPlugin =  require('terser-webpack-plugin');
  module.exports = {
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true // 开启并行压缩
        })
      ]
    }
  }
  ```

# DllPlugin 进一步分包： 预编译资源模块
思路： 将react react-dom redux react-redux 基础包和业务基础包打包到一个文件
方法： 1. 利用DLLplugin进行分包， 2. DLLReferencePlugin对mainfes.json引用

  ## 单独的配置文件
  一般为 webpack.dll.js
  
    webpack.dll.js   基础包配置
  ```javascript
  const path = require('path');
  const webpack =  require('webpack');

  module.exports = {
    // context: process.cwd();
    // resolve: {
    //   extensions: ['.js', '.jsx', '.json', '.less', '.css'],
    //   modules: [__dirname, 'node_modules']
    // },
    entry: {
      library: [
        'react',
        'react-dom',
        'redux',
        'react-redux'
      ],
      // 还可以增加其他的包库
    },
    output: {
      filename: '[name].dll.js',
      path: path.resolve(__dirname, './build/library')
    },
    plugins: [
      new webpack.DllPlugin({
        name: '[name]',
        path: './build/library/[name].json'
      })
    ]
  }
  ```

  ## 使用 DllReferencePlugin 引用 manifest.json
  在webpack.config.js中
  ```javascript
  module.exports = {
    plugins: [
      new webpack.DllReferencePlugin({
        mainfest: require(./build/library/library.json)
      })
    ]
  }
  ```
  然后在build的html中可以看到引入的<script src="/build/library/library.dll.js"></script>


  ## 图片压缩
  image-webpack-loader 直接引入就好 也可以自己配置更精细的设置


# loader 从右向左执行 洋葱模型 compose
```javascript
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) =>{
    return (...args) => a(b(...args))
  } )
}
```


# require.resolve

  <!-- https://www.jb51.net/article/111869.htm -->
  之前一直的方法都是，使用 path 模块以及 __dirname 变量 。

代码如下所示：
<!-- fs.readFileSync(path.join(__dirname, './assets/some-file.txt')); -->
使用 require.resolve 可以简化这一过程

示例代码：
<!-- fs.readFileSync(require.resolve('./assets/some-file.txt')); -->
此外, require.resolve 还会在拼接好路径之后检查该路径是否存在, 如果 resolve 的目标路径不存在, 就会抛出 Cannot find module './some-file.txt' 的异常. 省略了一道检查文件是否存在的工序 (fs.exists).

# process.cwd() 获取根目录


# process.argv   process是node的一个全局变量 所以不需要 require
process.argv 属性返回一个数组，这个数组包含了启动Node.js进程时的命令行参数，
其中：
数组的第一个元素process.argv[0]——返回启动Node.js进程的可执行文件所在的绝对路径
第二个元素process.argv[1]——为当前执行的JavaScript文件路径
剩余的元素为其他命令行参数

https://blog.csdn.net/zxj0904010228/article/details/83443585

